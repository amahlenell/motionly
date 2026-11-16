import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { services } from "@/lib/content";
import { normaliseWebsite } from "@/lib/website";

const allowedServices = new Set<string>(["unsure", ...services.map(({slug}) => slug)]);
const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxBytes = 16000;
const unavailableMessage = "Enquiry submission is currently unavailable. Please try again later.";

function error(status: number, message: string) {
  return NextResponse.json({ message }, { status });
}

async function readPayload(request: Request): Promise<Record<string, unknown>> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const decoder = new TextDecoder();
  let json = "";
  let bytes = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) {
        await reader.cancel();
        throw new RangeError("Request too large");
      }
      json += decoder.decode(value, { stream: true });
    }
    const data = JSON.parse(json + decoder.decode());
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Invalid body");
    return data;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto");
  const requestUrl = new URL(request.url);
  const sameOrigin = origin === requestUrl.origin || (host && origin === (protocol === "https" ? "https:" : requestUrl.protocol) + "//" + host);
  if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && !sameOrigin)) {
    return error(403, "Submit your enquiry from the Motionly website.");
  }
  if (request.headers.get("content-type")?.split(";")[0] !== "application/json") {
    return error(415, "Please send your enquiry using the form.");
  }

  let data: Record<string, unknown>;
  try {
    data = await readPayload(request);
  } catch (cause) {
    return cause instanceof RangeError ? error(413, "Your enquiry is too long.") : error(400, "We couldn’t read the enquiry.");
  }

  const field = (name: string) => typeof data[name] === "string" ? data[name].trim() : "";
  const id = field("id");
  const name = field("name");
  const email = field("email");
  const business = field("business");
  const rawWebsite = field("website");
  const website = normaliseWebsite(rawWebsite);
  const details = field("details");
  const service = field("service");
  const timeline = field("timeline");
  const budget = field("budget");
  const source = field("source") === "brand-discovery" ? "brand-discovery" : "contact";

  if (!uuidV4.test(id) || field("fax") || !name || name.length > 100 || !business || business.length > 160 ||
      email.length > 254 || !emailPattern.test(email) || !allowedServices.has(service) ||
      rawWebsite.length > 300 || ((rawWebsite || source === "brand-discovery") && !website) ||
      details.length < 10 || details.length > 3000 || timeline.length > 100 || budget.length > 100) {
    return error(400, "Check your contact details, website and project description, then try again.");
  }

  const database = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const secret = process.env.ENQUIRY_RATE_LIMIT_SECRET;
  if (!database || !key || !secret) return error(503, unavailableMessage);

  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateKey = createHmac("sha256", secret).update(ip).digest("hex");
  try {
    const response = await fetch(new URL("/rest/v1/rpc/submit_motionly_enquiry", database), {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: key, Authorization: "Bearer " + key },
      body: JSON.stringify({
        rate_key: rateKey,
        enquiry: { id, name, email, business, website, service, details, timeline: timeline || null, budget: budget || null, source },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return error(503, unavailableMessage);
    const result = await response.json();
    if (result === "rate-limited") return error(429, "Too many enquiries from this connection. Please try again in an hour.");
    if (result !== "saved") return error(503, unavailableMessage);
    return NextResponse.json({ id }, { status: 201 });
  } catch {
    return error(503, unavailableMessage);
  }
}

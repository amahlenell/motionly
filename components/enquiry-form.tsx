"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { normaliseWebsite } from "@/lib/website";

type Status = { kind: "idle" | "sending" | "success" | "error"; message: string };

export function EnquiryForm({ source, website, service }: { source: string; website: string; service: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });
  const submission = useRef<{ id: string; content: string } | null>(null);
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const rawWebsite = String(data.website || "").trim();
    if (rawWebsite && !normaliseWebsite(rawWebsite)) {
      setStatus({ kind: "error", message: "Enter a valid website address, such as yourbrand.co.nz." });
      form.querySelector<HTMLInputElement>("[name=website]")?.focus();
      return;
    }

    const content = JSON.stringify(data);
    if (submission.current?.content !== content) submission.current = { id: crypto.randomUUID(), content };
    submitting.current = true;
    setStatus({ kind: "sending", message: "Sending your enquiry…" });
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, id: submission.current.id }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.id) {
        setStatus({ kind: "error", message: result?.message || "Your enquiry could not be sent. Please try again." });
        return;
      }
      setStatus({ kind: "success", message: "Thanks for sending your brief. We’ll review it and reply by email." });
    } catch {
      setStatus({ kind: "error", message: "We couldn’t connect. Your details are still here so you can try again." });
    } finally {
      submitting.current = false;
    }
  }

  if (status.kind === "success") {
    return <div className="enquiry-form enquiry-success" role="status"><h2>Enquiry received.</h2><p>{status.message}</p><Link className="text-link" href="/work">Explore our studio concepts <ArrowUpRight size={16} aria-hidden="true" /></Link></div>;
  }

  return <form className="enquiry-form" method="post" action="/api/enquiries" onSubmit={handleSubmit}>
    <input type="hidden" name="source" value={source} />
    <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="fax" autoComplete="off" tabIndex={-1} /></label></div>
    <div className="form-grid">
      <label>Full name<input name="name" required maxLength={100} autoComplete="name" /></label>
      <label>Email address<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
      <label>Business name<input name="business" required maxLength={160} autoComplete="organization" /></label>
      <label>Website {source !== "brand-discovery" && <span>(optional)</span>}<input name="website" required={source === "brand-discovery"} defaultValue={website} inputMode="url" maxLength={300} placeholder="yourbrand.co.nz" autoComplete="url" /></label>
      <label className="full-width">What are you interested in?
        <select name="service" required defaultValue={service}>
          <option value="" disabled>Select a service</option>
          {services.map(({ slug, title }) => <option key={slug} value={slug}>{title}</option>)}
          <option value="unsure">Help me decide</option>
        </select>
      </label>
      <label className="full-width">Tell us about your project<textarea name="details" required minLength={10} maxLength={3000} rows={5} placeholder="What are you launching, what assets do you have, and when do you need the content?" /></label>
      <label>Target timeline <span>(optional)</span><input name="timeline" maxLength={100} placeholder="e.g. Late February" /></label>
      <label>Budget and currency <span>(optional)</span><input name="budget" maxLength={100} placeholder="e.g. NZ$2,000–3,000" /></label>
    </div>
    <p className="form-note"><Link href="/privacy">Privacy policy</Link></p>
    <button type="submit" className="button" disabled={status.kind === "sending"}>{status.kind === "sending" ? "Sending…" : "Send enquiry"} <ArrowUpRight size={17} aria-hidden="true" /></button>
    <p className={"form-message" + (status.kind === "error" ? " form-error" : "")} aria-live="polite">{status.message}</p>
  </form>;
}

import type { MetadataRoute } from "next";
import { absolute, indexable } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: ["GPTBot", "Google-Extended", "ClaudeBot"], disallow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/api/", "/motionly-source.zip"] },
    ],
    sitemap: absolute("/sitemap.xml"),
  };
}

import type { Metadata } from "next";
import { name, positioning, markets } from "./content";

export const siteUrl = new URL(
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL : "http://localhost:3000")
);
export const indexable = process.env.VERCEL_ENV === "production" || (!process.env.VERCEL_ENV && Boolean(process.env.SITE_URL));
export const absolute = (path: string) => new URL(path, siteUrl).href;

export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absolute(path) },
    robots: { index: indexable, follow: indexable },
    openGraph: {
      type: "website",
      title: title + " | Motionly",
      siteName: name,
      description,
      url: absolute(path),
      locale: "en_NZ",
      images: [{ url: absolute("/opengraph-image"), width: 1200, height: 630, alt: "Motionly Creative Studio" }],
    },
    twitter: { card: "summary_large_image", title: title + " | Motionly", description, images: [absolute("/opengraph-image")] },
  };
}

export const organisation = {
  "@type": "Organization",
  "@id": absolute("/#studio"),
  name,
  url: absolute("/"),
  description: positioning,
  areaServed: markets,
};

export function breadcrumb(path: string, title: string, service = false) {
  const items = [{ name: "Home", item: absolute("/") }];
  if (service) items.push({ name: "Services", item: absolute("/services") });
  items.push({ name: title, item: absolute(path) });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, ...item })),
  };
}

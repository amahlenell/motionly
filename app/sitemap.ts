import type { MetadataRoute } from "next";
import { publicPaths } from "@/lib/content";
import { absolute } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({ url: absolute(path) }));
}

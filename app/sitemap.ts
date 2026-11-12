import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// One page only — sections are anchors, not URLs.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl.href, changeFrequency: "monthly", priority: 1 }];
}

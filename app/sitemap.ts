import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://oss.arcabot.ai", changeFrequency: "daily", priority: 1 }];
}

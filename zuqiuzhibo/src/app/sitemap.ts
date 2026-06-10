import type { MetadataRoute } from "next";
import { absoluteUrl, getBlogPosts, getPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pageUrls = getPages().map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.path === "/football-live-stream-guide/" || page.path === "/global-football-live-stream/" ? 0.9 : 0.75
  }));
  const blogUrls = getBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}/`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    ...pageUrls,
    ...blogUrls
  ];
}

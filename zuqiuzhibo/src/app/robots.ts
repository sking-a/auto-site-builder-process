import type { MetadataRoute } from "next";
import { absoluteUrl, getSite } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const site = getSite();

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.siteUrl
  };
}

import rawSite from "@/content/site.json";
import type { BlogPost, SeoPage, SiteConfig } from "@/lib/types";

const site = rawSite as SiteConfig;

export function getSite(): SiteConfig {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl;
  return {
    ...site,
    siteUrl: siteUrl.replace(/\/+$/, "")
  };
}

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSite().siteUrl}${normalizedPath}`;
}

export function getPages(): SeoPage[] {
  return getSite().pages;
}

export function getPageByPath(path: string): SeoPage | undefined {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return getPages().find((page) => page.path === normalized);
}

export function getBlogPosts(): BlogPost[] {
  return getSite().blogPosts;
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function pathToSegments(path: string): string[] {
  return path.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
}

export function localeName(locale: string): string {
  return locale === "en" ? "English" : locale;
}

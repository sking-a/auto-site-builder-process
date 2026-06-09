import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const contentPath = join(root, "src", "content", "site.json");
const seoPath = join(root, "src", "lib", "seo.ts");

test("site content covers the planned bilingual football live keywords", () => {
  assert.equal(existsSync(contentPath), true);
  const site = JSON.parse(readFileSync(contentPath, "utf8"));

  assert.equal(site.siteUrl, "https://zuqiuzhibo.ppzhibo.com");
  assert.equal(site.siteName, "足球直播");
  assert.equal(site.primaryComplianceNote.includes("official"), true);
  assert.equal(site.keywords.length, 30);
  assert.equal(site.pages.some((page) => page.path === "/zh/zuqiu-zhibo/"), true);
  assert.equal(site.pages.some((page) => page.path === "/football-live-stream-guide/"), true);
  assert.equal(site.blogPosts.length >= 10, true);
});

test("all public pages have SEO essentials and no unauthorized stream promise", () => {
  const site = JSON.parse(readFileSync(contentPath, "utf8"));
  const forbidden = /盗链|破解|付费墙|pirated|illegal stream|bypass paywall/i;

  for (const page of site.pages) {
    assert.match(page.title, /\S/);
    const minDescriptionLength = page.locale === "zh" ? 45 : 80;
    const maxDescriptionLength = page.locale === "zh" ? 90 : 170;
    assert.ok(
      page.description.length >= minDescriptionLength && page.description.length <= maxDescriptionLength,
      `${page.path} description length is ${page.description.length}`
    );
    assert.match(page.h1, /\S/);
    assert.equal(page.faqs.length >= 2, true);
    assert.equal(forbidden.test(JSON.stringify(page)), false);
  }
});

test("seo helpers expose Article, FAQPage, HowTo, breadcrumb, and website schemas", () => {
  assert.equal(existsSync(seoPath), true);
  const seoSource = readFileSync(seoPath, "utf8");

  for (const symbol of [
    "articleSchema",
    "faqPageSchema",
    "howToSchema",
    "breadcrumbSchema",
    "websiteSchema"
  ]) {
    assert.equal(seoSource.includes(`function ${symbol}`), true, `${symbol} is missing`);
  }
});

test("app router contains sitemap, robots, homepage, core pages, and blog routes", () => {
  for (const file of [
    "src/app/page.tsx",
    "src/app/sitemap.ts",
    "src/app/robots.ts",
    "src/app/[...slug]/page.tsx",
    "src/app/blog/[slug]/page.tsx"
  ]) {
    assert.equal(existsSync(join(root, file)), true, `${file} is missing`);
  }
});

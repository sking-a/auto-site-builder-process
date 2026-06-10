import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const contentPath = join(root, "src", "content", "site.json");
const seoPath = join(root, "src", "lib", "seo.ts");

test("site content covers the planned English football live keywords", () => {
  assert.equal(existsSync(contentPath), true);
  const site = JSON.parse(readFileSync(contentPath, "utf8"));

  assert.equal(site.siteUrl, "https://zuqiuzhibo.ppzhibo.com");
  assert.equal(site.siteName, "Football Live Guide");
  assert.equal(site.primaryComplianceNote.includes("official"), true);
  assert.equal(site.keywords.length, 30);
  assert.equal(site.pages.some((page) => page.path === "/global-football-live-stream/"), true);
  assert.equal(site.pages.some((page) => page.path === "/football-live-stream-guide/"), true);
  assert.equal(site.blogPosts.length >= 10, true);
});

test("all content is English only and has no unauthorized stream promise", () => {
  const site = JSON.parse(readFileSync(contentPath, "utf8"));
  const forbidden = /盗链|破解|付费墙|pirated|illegal stream|bypass paywall/i;
  const chineseCharacters = /[\u3400-\u9fff]/;

  for (const page of site.pages) {
    assert.match(page.title, /\S/);
    assert.ok(
      page.description.length >= 80 && page.description.length <= 170,
      `${page.path} description length is ${page.description.length}`
    );
    assert.match(page.h1, /\S/);
    assert.equal(page.faqs.length >= 2, true);
    assert.equal(forbidden.test(JSON.stringify(page)), false);
    assert.equal(chineseCharacters.test(JSON.stringify(page)), false, `${page.path} contains Chinese text`);
    assert.equal(page.locale, "en");
  }

  for (const post of site.blogPosts) {
    assert.equal(post.locale, "en");
    assert.equal(chineseCharacters.test(JSON.stringify(post)), false, `${post.slug} contains Chinese text`);
  }
});

test("source files that render public pages do not contain Chinese characters", () => {
  const files = [
    "README.md",
    "src/content/site.json",
    "src/components/SiteHeader.tsx",
    "src/components/SiteFooter.tsx",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/lib/site.ts",
    "src/lib/seo.ts"
  ];
  const chineseCharacters = /[\u3400-\u9fff]/;

  for (const file of files) {
    const source = readFileSync(join(root, file), "utf8");
    assert.equal(chineseCharacters.test(source), false, `${file} contains Chinese text`);
  }
});

test("header uses a designed SVG logo instead of the FL placeholder", () => {
  const header = readFileSync(join(root, "src", "components", "SiteHeader.tsx"), "utf8");
  const logo = readFileSync(join(root, "src", "components", "BrandLogo.tsx"), "utf8");

  assert.equal(header.includes("BrandLogo"), true);
  assert.equal(header.includes(">FL<"), false);
  assert.equal(logo.includes("<svg"), true);
  assert.equal(logo.includes("Football Live Guide logo"), true);
});

test("homepage uses a designed hero visual instead of a placeholder image", () => {
  const home = readFileSync(join(root, "src", "app", "page.tsx"), "utf8");
  const heroVisual = readFileSync(join(root, "src", "components", "HeroVisual.tsx"), "utf8");

  assert.equal(home.includes("HeroVisual"), true);
  assert.equal(home.includes("stadium-guide.webp"), false);
  assert.equal(heroVisual.includes("Match signal"), true);
  assert.equal(heroVisual.includes("Official channels verified"), true);
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

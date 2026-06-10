import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();

test("layout injects GA4 and Google Search Console from environment variables", () => {
  const layout = readFileSync(join(root, "src", "app", "layout.tsx"), "utf8");

  assert.equal(layout.includes("GoogleAnalytics"), true);
  assert.equal(layout.includes("NEXT_PUBLIC_GA_ID"), true);
  assert.equal(layout.includes("GOOGLE_SITE_VERIFICATION"), true);
});

test("project exposes a Google setup script and documented environment variables", () => {
  const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const envExample = readFileSync(join(root, ".env.example"), "utf8");

  assert.equal(packageJson.scripts["setup:google"], "node scripts/setup-google-integrations.mjs");
  assert.equal(envExample.includes("NEXT_PUBLIC_GA_ID=G-"), true);
  assert.equal(envExample.includes("GOOGLE_SITE_VERIFICATION="), true);
  assert.equal(envExample.includes("GOOGLE_SEARCH_CONSOLE_HTML_TOKEN="), true);
  assert.equal(existsSync(join(root, "scripts", "setup-google-integrations.mjs")), true);
});

test("Google setup helpers validate GA4 IDs and normalize Search Console HTML tokens", async () => {
  const moduleUrl = pathToFileURL(join(root, "scripts", "setup-google-integrations.mjs")).href;
  const setup = await import(`${moduleUrl}?cache=${Date.now()}`);

  assert.equal(setup.validateGaId("G-ABCDEFG123"), true);
  assert.equal(setup.validateGaId("UA-123456-1"), false);
  assert.equal(setup.normalizeGoogleVerificationToken("googleabc123.html"), "googleabc123");
  assert.equal(setup.normalizeGoogleVerificationToken("abc123"), "googleabc123");
  assert.deepEqual(setup.buildVerificationFile("abc123"), {
    fileName: "googleabc123.html",
    body: "google-site-verification: googleabc123.html\n"
  });
});

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function validateGaId(value) {
  return /^G-[A-Z0-9]{6,}$/i.test(String(value || "").trim());
}

export function normalizeGoogleVerificationToken(value) {
  const raw = String(value || "").trim();
  if (!raw) {
    return "";
  }

  const withoutBody = raw.replace(/^google-site-verification:\s*/i, "").trim();
  const withoutHtml = withoutBody.replace(/\.html$/i, "");
  return withoutHtml.startsWith("google") ? withoutHtml : `google${withoutHtml}`;
}

export function buildVerificationFile(value) {
  const token = normalizeGoogleVerificationToken(value);
  if (!token) {
    return null;
  }

  const fileName = `${token}.html`;
  return {
    fileName,
    body: `google-site-verification: ${fileName}\n`
  };
}

export async function readEnvFiles(cwd = root) {
  const values = {};

  for (const name of [".env.local", ".env"]) {
    const filePath = path.join(cwd, name);
    if (!existsSync(filePath)) {
      continue;
    }

    const text = await readFile(filePath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separator = trimmed.indexOf("=");
      if (separator === -1) {
        continue;
      }

      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
      if (key && !values[key]) {
        values[key] = value;
      }
    }
  }

  return values;
}

export async function setupGoogleIntegrations(cwd = root) {
  const env = {
    ...process.env,
    ...(await readEnvFiles(cwd))
  };
  const gaId = env.NEXT_PUBLIC_GA_ID || "";
  const gscMetaToken = env.GOOGLE_SITE_VERIFICATION || "";
  const gscHtmlToken = env.GOOGLE_SEARCH_CONSOLE_HTML_TOKEN || gscMetaToken;
  const publicDir = path.join(cwd, "public");
  const messages = [];

  if (gaId) {
    if (!validateGaId(gaId)) {
      throw new Error(`NEXT_PUBLIC_GA_ID must look like G-XXXXXXXXXX. Received: ${gaId}`);
    }
    messages.push(`GA4 enabled with ${gaId}.`);
  } else {
    messages.push("GA4 is not enabled because NEXT_PUBLIC_GA_ID is empty.");
  }

  const verification = buildVerificationFile(gscHtmlToken);
  if (verification) {
    await mkdir(publicDir, { recursive: true });
    await writeFile(path.join(publicDir, verification.fileName), verification.body, "utf8");
    messages.push(`Search Console HTML verification file written: public/${verification.fileName}`);
  } else {
    messages.push("Search Console HTML verification file was not written because no token was provided.");
  }

  if (gscMetaToken) {
    messages.push("Search Console meta verification will be injected at build time.");
  } else {
    messages.push("Search Console meta verification is not enabled because GOOGLE_SITE_VERIFICATION is empty.");
  }

  return messages;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  setupGoogleIntegrations()
    .then((messages) => {
      for (const message of messages) {
        console.log(message);
      }
    })
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exit(1);
    });
}

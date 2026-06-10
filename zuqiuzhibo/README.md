# Football Live Guide

Mobile-first Next.js 14 static SEO site for `zuqiuzhibo.ppzhibo.com`.

This project is a legal official-channel guide. It does not host, scrape, embed, or promote unauthorized football streams.

## Run

```powershell
npm install
npm run dev
```

## Validate

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

## Analytics and Search Console

Set these on Vercel:

```text
NEXT_PUBLIC_SITE_URL=https://zuqiuzhibo.ppzhibo.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GOOGLE_SITE_VERIFICATION=google-site-verification-token
GOOGLE_SEARCH_CONSOLE_HTML_TOKEN=google-site-verification-token
```

Run the local integration helper before building when you use Search Console HTML verification:

```powershell
npm run setup:google
npm run build
```

`NEXT_PUBLIC_GA_ID` injects GA4 through `@next/third-parties/google`. `GOOGLE_SITE_VERIFICATION` injects the Search Console meta tag during build. `GOOGLE_SEARCH_CONSOLE_HTML_TOKEN` creates the `public/googlexxxx.html` verification file automatically.

import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSite } from "@/lib/site";

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "足球直播 | Football Live Stream Guide, TV Schedule & Official Channels",
    template: "%s | 足球直播"
  },
  description:
    "Find today's football live schedule, official soccer streaming channels, legal viewing guides, and bilingual match-watching tips for global fans.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      zh: "/zh/zuqiu-zhibo/"
    }
  },
  openGraph: {
    type: "website",
    url: site.siteUrl,
    title: "足球直播 | Football Live Stream Guide",
    description:
      "Official-channel football live stream guide with today schedules, league pages, device tutorials, and bilingual SEO content.",
    siteName: site.siteName
  },
  twitter: {
    card: "summary_large_image",
    title: "足球直播 | Football Live Stream Guide",
    description: "Today schedules, official channels, legal viewing guides, and mobile-friendly match-day tips."
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.GOOGLE_SITE_VERIFICATION
      }
    : undefined
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        {process.env.NEXT_PUBLIC_GA_ID ? <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} /> : null}
      </body>
    </html>
  );
}

import Link from "next/link";
import { getSite } from "@/lib/site";

export function SiteFooter() {
  const site = getSite();

  return (
    <footer className="border-t border-white/10 bg-[#050d0a] px-5 py-10 text-sm text-mist">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-black text-white">{site.siteName}</p>
          <p className="mt-3 max-w-xl">{site.primaryComplianceNote}</p>
        </div>
        <div className="grid gap-2">
          <Link href="/football-live-stream-guide/" className="hover:text-white">
            Football guide
          </Link>
          <Link href="/global-football-live-stream/" className="hover:text-white">
            Global guide
          </Link>
          <Link href="/today-football-live-stream/" className="hover:text-white">
            Today schedule
          </Link>
        </div>
        <div>
          <p>Domain: {site.siteUrl.replace("https://", "")}</p>
          <p className="mt-2">Built for fast static hosting on Vercel.</p>
        </div>
      </div>
    </footer>
  );
}

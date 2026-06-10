import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const navItems = [
  { label: "Today", href: "/today-football-live-stream/" },
  { label: "Guide", href: "/football-live-stream-guide/" },
  { label: "Leagues", href: "/leagues/premier-league-live-stream/" },
  { label: "Devices", href: "/devices/watch-football-live-on-mobile/" },
  { label: "Global", href: "/global-football-live-stream/" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-pitch/88 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3 text-lg font-black text-white">
          <BrandLogo className="h-10 w-10 shrink-0" />
          <span>Football Live Guide</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-mist md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/today-football-live-stream/"
          className="rounded-full bg-lime px-4 py-2 text-sm font-bold text-pitch transition hover:bg-white"
        >
          Official Channels
        </Link>
      </nav>
    </header>
  );
}

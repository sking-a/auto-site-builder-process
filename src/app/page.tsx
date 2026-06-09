import Link from "next/link";
import Image from "next/image";
import { BlogRail, ComplianceNotice, ProviderGrid, ScheduleBand } from "@/components/PageSections";
import { JsonLd } from "@/components/JsonLd";
import { getBlogPosts, getSite } from "@/lib/site";
import { websiteSchema } from "@/lib/seo";

export default function HomePage() {
  const site = getSite();
  const posts = getBlogPosts();

  return (
    <main className="pitch-grid min-h-screen">
      <JsonLd data={websiteSchema()} />
      <section className="px-5 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-lime">Official channels only</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
              Football Live Stream Guide
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
              Match-day guidance for today&apos;s football schedule, official channels, league viewing routes,
              and mobile-friendly setup. No unauthorized streams, no unsafe popups.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/today-football-live-stream/" className="rounded-full bg-lime px-6 py-3 text-center font-black text-pitch hover:bg-white">
                Today&apos;s Schedule
              </Link>
              <Link href="/football-live-stream-guide/" className="rounded-full border border-white/20 px-6 py-3 text-center font-black text-white hover:bg-white/10">
                Official Guide
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-lime/20 bg-white/[0.05] p-4 shadow-glow">
            <Image
              src="/stadium-guide.webp"
              alt="Abstract night football stadium with pitch lines for the Football Live Guide official channel site"
              width="900"
              height="620"
              className="aspect-[1.45] w-full rounded-[1.5rem] object-cover"
              loading="eager"
            />
            <div className="grid gap-3 pt-4 sm:grid-cols-3">
              {["Today Schedule", "Official Channels", "Mobile Friendly"].map((label) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-pitch/70 p-4 text-sm font-bold text-lime">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ComplianceNotice text={site.primaryComplianceNote} />
      <ScheduleBand matches={site.matchGuides} />
      <ProviderGrid providers={site.providers} />
      <BlogRail posts={posts} />
    </main>
  );
}

import Link from "next/link";
import type { BlogPost, FaqItem, HowTo, MatchGuide, OfficialProvider, SeoSection } from "@/lib/types";

export function ComplianceNotice({ text }: { text: string }) {
  return (
    <section className="border-y border-lime/15 bg-lime/8 px-5 py-5 text-sm text-lime">
      <div className="mx-auto max-w-7xl">{text}</div>
    </section>
  );
}

export function ScheduleBand({ matches }: { matches: MatchGuide[] }) {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black text-white">Today-ready match guide</h2>
            <p className="mt-2 max-w-2xl text-mist">
              Use these rows as starting points, then verify your local official listing before kickoff.
            </p>
          </div>
          <Link href="/today-football-live-stream/" className="text-sm font-bold text-lime hover:text-white">
            Open today guide
          </Link>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          {matches.map((match) => (
            <Link
              key={match.path}
              href={match.path}
              className="grid gap-3 border-b border-white/10 p-5 transition last:border-b-0 hover:bg-white/[0.06] md:grid-cols-[1fr_1fr_1fr_1fr]"
            >
              <span className="font-bold text-white">{match.competition}</span>
              <span className="text-mist">{match.match}</span>
              <span className="text-mist">{match.time}</span>
              <span className="text-lime">{match.channel}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProviderGrid({ providers }: { providers: OfficialProvider[] }) {
  return (
    <section className="bg-white px-5 py-16 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black">Official-channel checks</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {providers.map((provider) => (
            <article key={provider.name} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">{provider.region}</p>
              <h3 className="mt-3 text-xl font-black">{provider.name}</h3>
              <p className="mt-3 text-slate-600">{provider.description}</p>
              <a href={provider.url} className="mt-5 inline-block font-bold text-emerald-700" rel="noreferrer">
                Visit source
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContentSections({ sections }: { sections: SeoSection[] }) {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto grid max-w-5xl gap-6">
        {sections.map((section) => (
          <article key={section.heading} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <h2 className="text-2xl font-black text-white">{section.heading}</h2>
            <p className="mt-4 leading-8 text-mist">{section.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-black text-white">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <summary className="cursor-pointer text-lg font-bold text-white">{faq.question}</summary>
              <p className="mt-3 leading-7 text-mist">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowToSteps({ howTo }: { howTo: HowTo }) {
  return (
    <section className="bg-[#0b1f16] px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-black text-white">{howTo.name}</h2>
        <ol className="mt-7 grid gap-4 md:grid-cols-2">
          {howTo.steps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-lime/20 bg-lime/8 p-5 text-mist">
              <span className="mb-4 grid h-9 w-9 place-items-center rounded-full bg-lime font-black text-pitch">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function BlogRail({ posts }: { posts: BlogPost[] }) {
  return (
    <section className="px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black text-white">Bilingual blog system</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:bg-white/[0.07]">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">{post.locale}</span>
              <h3 className="mt-4 text-xl font-black text-white">{post.title}</h3>
              <p className="mt-3 text-sm leading-6 text-mist">{post.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ComplianceNotice,
  ContentSections,
  FaqList,
  HowToSteps,
  ProviderGrid,
  ScheduleBand
} from "@/components/PageSections";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, getPageByPath, getPages, getSite, pathToSegments } from "@/lib/site";
import { alternateLanguages, articleSchema, breadcrumbSchema, faqPageSchema, howToSchema } from "@/lib/seo";

type PageProps = {
  params: {
    slug: string[];
  };
};

export function generateStaticParams() {
  return getPages().map((page) => ({
    slug: pathToSegments(page.path)
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const path = `/${params.slug.join("/")}/`;
  const page = getPageByPath(path);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: absoluteUrl(page.path),
      languages: alternateLanguages(page.path)
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(page.path),
      type: "article"
    }
  };
}

export default function SeoLandingPage({ params }: PageProps) {
  const path = `/${params.slug.join("/")}/`;
  const page = getPageByPath(path);
  const site = getSite();

  if (!page) {
    notFound();
  }

  return (
    <main className="pitch-grid min-h-screen">
      <JsonLd data={articleSchema(page, page.path)} />
      <JsonLd data={faqPageSchema(page.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: page.h1, path: page.path }])} />
      {page.howTo ? <JsonLd data={howToSchema(page.howTo)} /> : null}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-lime">{page.keyword}</p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">{page.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-mist">{page.summary}</p>
        </div>
      </section>
      <ComplianceNotice text={site.primaryComplianceNote} />
      <ContentSections sections={page.sections} />
      {page.howTo ? <HowToSteps howTo={page.howTo} /> : null}
      <ScheduleBand matches={site.matchGuides} />
      <ProviderGrid providers={site.providers} />
      <FaqList faqs={page.faqs} />
    </main>
  );
}

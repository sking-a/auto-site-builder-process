import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComplianceNotice } from "@/components/PageSections";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, getBlogPost, getBlogPosts, getSite } from "@/lib/site";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

type BlogProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogProps): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {};
  }

  const path = `/blog/${post.slug}/`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: absoluteUrl(path)
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: absoluteUrl(path),
      type: "article"
    }
  };
}

export default function BlogPostPage({ params }: BlogProps) {
  const post = getBlogPost(params.slug);
  const site = getSite();

  if (!post) {
    notFound();
  }

  const path = `/blog/${post.slug}/`;

  return (
    <main className="pitch-grid min-h-screen">
      <JsonLd data={articleSchema(post, path)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: post.title, path }])} />
      <article className="mx-auto max-w-4xl px-5 py-16 md:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-lime">{post.keyword}</p>
        <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">{post.title}</h1>
        <p className="mt-6 text-lg leading-8 text-mist">{post.description}</p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.05] p-7 text-lg leading-9 text-mist">
          {post.body}
        </div>
      </article>
      <ComplianceNotice text={site.primaryComplianceNote} />
    </main>
  );
}

import type { BlogPost, FaqItem, HowTo, SeoPage } from "@/lib/types";
import { absoluteUrl, getSite } from "@/lib/site";

export function websiteSchema() {
  const site = getSite();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.siteName,
    url: site.siteUrl,
    inLanguage: ["en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function articleSchema(item: SeoPage | BlogPost, path: string) {
  const site = getSite();

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.description,
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: site.siteName
    },
    publisher: {
      "@type": "Organization",
      name: site.siteName
    },
    about: item.keyword,
    inLanguage: item.locale
  };
}

export function faqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function howToSchema(howTo: HowTo) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    step: howTo.steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text
    }))
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function alternateLanguages(path: string) {
  const site = getSite();

  return {
    [site.defaultLocale]: absoluteUrl(path)
  };
}

export type Locale = "en";

export type FaqItem = {
  question: string;
  answer: string;
};

export type HowToStep = string;

export type HowTo = {
  name: string;
  steps: HowToStep[];
};

export type OfficialProvider = {
  name: string;
  region: string;
  description: string;
  url: string;
};

export type MatchGuide = {
  competition: string;
  match: string;
  time: string;
  channel: string;
  path: string;
};

export type SeoSection = {
  heading: string;
  body: string;
};

export type SeoPage = {
  path: string;
  locale: Locale;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  summary: string;
  sections: SeoSection[];
  faqs: FaqItem[];
  howTo?: HowTo;
};

export type BlogPost = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  keyword: string;
  body: string;
};

export type SiteConfig = {
  siteName: string;
  siteUrl: string;
  defaultLocale: Locale;
  alternateLocales: Locale[];
  primaryComplianceNote: string;
  keywords: string[];
  providers: OfficialProvider[];
  matchGuides: MatchGuide[];
  pages: SeoPage[];
  blogPosts: BlogPost[];
};

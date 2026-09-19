import type { Metadata } from "next";
import { DocumentLang } from "@/components/i18n/DocumentLang";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getSiteUrl } from "@/lib/site";

type LangParams = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s — ${dict.person.name}`,
    },
    description: dict.meta.description,
    keywords: [...dict.meta.keywords],
    authors: [{ name: dict.person.name }],
    creator: dict.person.name,
    openGraph: {
      type: "website",
      locale: lang === "de" ? "de_DE" : "ru_RU",
      url: `${siteUrl}/${lang}/`,
      siteName: dict.person.name,
      title: dict.meta.title,
      description: dict.meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: {
      canonical: `/${lang}/`,
      languages: {
        de: `${siteUrl}/de/`,
        ru: `${siteUrl}/ru/`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LangParams & { children: React.ReactNode }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const locale = lang as Locale;

  return (
    <>
      <DocumentLang locale={locale} />
      <SkipLink label={dict.a11y.skip} />
      <SiteHeader locale={locale} dict={dict} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}

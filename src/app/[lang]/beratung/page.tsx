import type { Metadata } from "next";
import { ConsultationForm } from "@/components/consult/ConsultationForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.nav.consult,
    description: dict.consultPage.lead,
    alternates: { canonical: localizedPath(lang as Locale, "consult") },
  };
}

export default async function ConsultPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const locale = lang as Locale;
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: dict.jsonLd.home,
              item: `${siteUrl}/${locale}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: dict.jsonLd.consult,
              item: `${siteUrl}${localizedPath(locale, "consult")}`,
            },
          ],
        }}
      />

      <Container className="grid gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div>
          <p className="text-xs tracking-[0.18em] text-copper uppercase">
            {dict.consultPage.kicker}
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
            {dict.consultPage.h1}
          </h1>
          <p className="mt-6 leading-8 text-ink-muted">{dict.consultPage.lead}</p>
          <ul className="mt-8 space-y-3 text-sm leading-6 text-ink-muted">
            {dict.consultPage.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <ConsultationForm
          locale={locale}
          dict={dict.form}
          privacyHref={localizedPath(locale, "privacy")}
        />
      </Container>
    </>
  );
}

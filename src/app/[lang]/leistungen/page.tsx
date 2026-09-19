import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
    title: dict.nav.services,
    description: dict.servicesPage.lead,
    alternates: { canonical: localizedPath(lang as Locale, "services") },
  };
}

export default async function ServicesPage({
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
              name: dict.jsonLd.services,
              item: `${siteUrl}${localizedPath(locale, "services")}`,
            },
          ],
        }}
      />

      <Container className="py-16 lg:py-20">
        <p className="text-xs tracking-[0.18em] text-copper uppercase">
          {dict.servicesPage.kicker}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl sm:text-5xl">
          {dict.servicesPage.h1}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
          {dict.servicesPage.lead}
        </p>

        <div className="mt-14 space-y-8">
          {dict.services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-24 border border-line bg-white p-6 sm:p-8"
            >
              <h2 className="font-serif text-3xl">{service.title}</h2>
              <p className="mt-4 leading-7 text-ink-muted">{service.summary}</p>
              <p className="mt-5 text-sm">
                <span className="text-copper">{dict.servicesPage.forWhomLabel}</span>
                {service.forWhom}
              </p>
              <h3 className="mt-6 text-sm tracking-wide text-ink">
                {dict.servicesPage.includes}
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-ink-muted">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <ButtonLink href={localizedPath(locale, "consult")}>
            {dict.servicesPage.cta}
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
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
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    alternates: { canonical: `/${lang}` },
  };
}

export default async function HomePage({
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
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: dict.person.name,
            description: dict.meta.description,
            url: `${siteUrl}/${locale}`,
            areaServed: "DE",
            availableLanguage: ["ru", "de"],
            serviceType: dict.jsonLd.serviceType,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: dict.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          },
        ]}
      />

      <section className="border-b border-line">
        <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:py-24">
          <div>
            <p className="text-xs tracking-[0.22em] text-copper uppercase">
              {dict.home.kicker}
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-6xl">
              {dict.home.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-muted">
              {dict.home.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={localizedPath(locale, "consult")}>
                {dict.home.ctaConsult}
              </ButtonLink>
              <ButtonLink href={localizedPath(locale, "services")} variant="secondary">
                {dict.home.ctaServices}
              </ButtonLink>
            </div>
          </div>

          <aside className="self-end border border-line bg-white p-6">
            <p className="text-xs tracking-[0.18em] text-copper uppercase">
              {dict.home.forWhomKicker}
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6">
              {dict.home.forWhom.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="services-heading" className="border-b border-line">
        <Container className="py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.18em] text-copper uppercase">
                {dict.home.servicesKicker}
              </p>
              <h2 id="services-heading" className="mt-3 font-serif text-3xl sm:text-4xl">
                {dict.home.servicesTitle}
              </h2>
            </div>
            <Link
              className="text-sm text-forest underline-offset-4 hover:underline"
              href={localizedPath(locale, "services")}
            >
              {dict.home.allServices}
            </Link>
          </div>

          <ol className="mt-10 divide-y divide-line border-y border-line">
            {dict.services.map((service, index) => (
              <li
                key={service.id}
                className="grid gap-4 py-8 md:grid-cols-[80px_1fr_1.2fr]"
              >
                <p className="font-serif text-2xl text-copper">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-2xl">
                  <Link
                    className="hover:text-forest"
                    href={localizedPath(locale, "services", service.id)}
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="text-ink-muted leading-7">{service.summary}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="principles-heading" className="border-b border-line bg-white">
        <Container className="py-16 lg:py-20">
          <h2 id="principles-heading" className="font-serif text-3xl sm:text-4xl">
            {dict.home.principlesTitle}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {dict.principles.map((item) => (
              <article key={item.title} className="border border-line p-6">
                <h3 className="font-serif text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="steps-heading" className="border-b border-line">
        <Container className="py-16 lg:py-20">
          <h2 id="steps-heading" className="font-serif text-3xl sm:text-4xl">
            {dict.home.stepsTitle}
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dict.steps.map((step) => (
              <li key={step.n}>
                <p className="text-xs tracking-[0.18em] text-copper">{step.n}</p>
                <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="border-b border-line">
        <Container className="py-16 lg:py-20">
          <h2 id="faq-heading" className="font-serif text-3xl sm:text-4xl">
            {dict.home.faqTitle}
          </h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {dict.faqs.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-medium marker:content-none">
                  <span className="flex items-start justify-between gap-4">
                    {item.question}
                    <span aria-hidden="true" className="text-copper group-open:hidden">
                      +
                    </span>
                    <span aria-hidden="true" className="hidden text-copper group-open:inline">
                      −
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ink-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest text-paper">
        <Container className="flex flex-col items-start gap-6 py-16 lg:py-20">
          <h2 className="max-w-2xl font-serif text-3xl sm:text-4xl">
            {dict.home.ctaTitle}
          </h2>
          <ButtonLink href={localizedPath(locale, "consult")} variant="onDark">
            {dict.home.ctaButton}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}

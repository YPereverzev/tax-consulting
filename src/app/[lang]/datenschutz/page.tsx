import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getContactEmail } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.privacy.h1,
    description: dict.privacy.sections[1]?.body,
    alternates: { canonical: localizedPath(lang as Locale, "privacy") },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const email = getContactEmail();

  return (
    <Container className="max-w-3xl py-16 lg:py-20">
      <p className="text-xs tracking-[0.18em] text-copper uppercase">
        {dict.privacy.kicker}
      </p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">{dict.privacy.h1}</h1>
      <p className="mt-6 text-sm text-ink-muted">{dict.privacy.updated}</p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-ink">
        {dict.privacy.sections.map((section) => {
          const contact = email ? (
            <a className="underline" href={`mailto:${email}`}>
              {email}
            </a>
          ) : (
            section.fallbackEmail ?? ""
          );
          const [before, after] = section.body.split("{email}");

          return (
            <section key={section.title}>
              <h2 className="font-serif text-2xl">{section.title}</h2>
              <p className="mt-3 text-ink-muted">
                {after !== undefined ? (
                  <>
                    {before}
                    {contact}
                    {after}
                  </>
                ) : (
                  section.body
                )}
              </p>
            </section>
          );
        })}
      </div>
    </Container>
  );
}

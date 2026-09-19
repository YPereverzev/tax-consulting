import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { defaultLocale, localizedPath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <Container className="py-24">
      <p className="text-xs tracking-[0.18em] text-copper uppercase">404</p>
      <h1 className="mt-4 font-serif text-4xl">{dict.notFound.title}</h1>
      <p className="mt-4 max-w-xl text-ink-muted leading-7">{dict.notFound.text}</p>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link
          className="text-forest underline-offset-4 hover:underline"
          href={localizedPath(defaultLocale)}
        >
          {dict.notFound.home}
        </Link>
        <Link
          className="text-forest underline-offset-4 hover:underline"
          href={localizedPath(defaultLocale, "consult")}
        >
          {dict.notFound.consult}
        </Link>
      </div>
    </Container>
  );
}

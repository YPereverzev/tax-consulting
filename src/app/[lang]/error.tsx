"use client";

import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { de } from "@/lib/i18n/messages/de";
import { ru } from "@/lib/i18n/messages/ru";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams<{ lang?: string }>();
  const locale = params.lang && isLocale(params.lang) ? params.lang : defaultLocale;
  const dict = locale === "de" ? de : ru;

  return (
    <Container className="py-24">
      <p className="text-xs tracking-[0.18em] text-copper uppercase">{dict.error.kicker}</p>
      <h1 className="mt-4 font-serif text-4xl">{dict.error.title}</h1>
      <p className="mt-4 max-w-xl text-ink-muted leading-7">{dict.error.text}</p>
      <button
        type="button"
        className="mt-8 inline-flex min-h-12 items-center bg-forest px-5 text-sm text-paper hover:bg-forest-hover"
        onClick={() => reset()}
      >
        {dict.error.retry}
      </button>
    </Container>
  );
}

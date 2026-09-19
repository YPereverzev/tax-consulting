"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleFlag } from "@/components/i18n/LocaleFlag";
import {
  localeLabels,
  localeNames,
  locales,
  swapLocale,
  type Locale,
} from "@/lib/i18n/config";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <nav aria-label={label} className="flex items-center gap-1">
      {locales.map((item) => {
        const current = item === locale;

        return (
          <Link
            key={item}
            href={swapLocale(pathname, item)}
            hrefLang={item}
            aria-label={localeLabels[item]}
            aria-current={current ? "page" : undefined}
            className={`inline-flex min-h-11 items-center gap-1.5 px-2 text-xs tracking-wide ${
              current ? "text-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            <LocaleFlag locale={item} />
            <span aria-hidden="true">{localeNames[item]}</span>
          </Link>
        );
      })}
    </nav>
  );
}

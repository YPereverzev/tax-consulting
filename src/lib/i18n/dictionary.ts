import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { de } from "@/lib/i18n/messages/de";
import { ru, type Dictionary } from "@/lib/i18n/messages/ru";

const dictionaries: Record<Locale, Dictionary> = { ru, de };

export type { Dictionary, Locale };

export function getDictionary(locale: string): Dictionary {
  if (!isLocale(locale)) notFound();
  return dictionaries[locale];
}

export const locales = ["ru", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const localeNames: Record<Locale, string> = {
  ru: "RU",
  de: "DE",
};

export const localeLabels: Record<Locale, string> = {
  ru: "Русский",
  de: "Deutsch",
};

export const routeSegment = {
  services: "leistungen",
  consult: "beratung",
  privacy: "datenschutz",
} as const;

export type AppRoute = keyof typeof routeSegment | "home";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localizedPath(locale: Locale, route: AppRoute = "home", hash?: string) {
  const base =
    route === "home" ? `/${locale}/` : `/${locale}/${routeSegment[route]}/`;
  return hash ? `${base.slice(0, -1)}#${hash}` : base;
}

export function swapLocale(pathname: string, next: Locale) {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  }
  return `/${next}`;
}

export const legacyRedirects: Record<string, string> = {
  "/uslugi": `/${routeSegment.services}`,
  "/konsultatsiya": `/${routeSegment.consult}`,
  "/politika-konfidentsialnosti": `/${routeSegment.privacy}`,
};

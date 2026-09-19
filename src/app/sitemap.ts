import type { MetadataRoute } from "next";
import { locales, localizedPath, type AppRoute } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes: AppRoute[] = ["home", "services", "consult", "privacy"];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteUrl}${localizedPath(locale, route)}`,
      lastModified: new Date(),
      changeFrequency: route === "privacy" ? "yearly" : "monthly",
      priority: route === "home" ? 1 : route === "consult" ? 0.9 : route === "services" ? 0.8 : 0.3,
    })),
  );
}

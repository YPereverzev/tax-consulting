"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const home = localizedPath(locale);
  const services = localizedPath(locale, "services");
  const consult = localizedPath(locale, "consult");

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navItems = [
    { href: services, label: dict.nav.services },
    { href: consult, label: dict.nav.consult },
  ];

  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href={home} className="flex min-h-12 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center bg-forest font-serif text-lg text-paper"
          >
            {dict.person.mark}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg text-ink">{dict.person.name}</span>
            <span className="text-xs tracking-wide text-ink-muted">
              {dict.person.profession}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav aria-label={dict.a11y.mainNav} className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm tracking-wide ${
                      pathname === item.href ? "text-forest" : "text-ink hover:text-forest"
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={consult}
                  className="inline-flex min-h-11 items-center bg-forest px-4 text-sm text-paper hover:bg-forest-hover"
                >
                  {dict.nav.request}
                </Link>
              </li>
            </ul>
          </nav>

          <LanguageSwitcher locale={locale} label={dict.a11y.language} />

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-sm md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? dict.a11y.close : dict.a11y.menu}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id={menuId}
          aria-label={dict.a11y.mobileNav}
          className="border-t border-line px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-12 items-center text-base"
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={consult}
                className="flex min-h-12 items-center text-base text-forest"
                onClick={() => setOpen(false)}
              >
                {dict.nav.request}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

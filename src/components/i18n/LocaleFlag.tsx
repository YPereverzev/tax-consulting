import type { Locale } from "@/lib/i18n/config";

export function LocaleFlag({
  locale,
  className = "h-3.5 w-[21px]",
}: {
  locale: Locale;
  className?: string;
}) {
  if (locale === "de") {
    return (
      <svg
        viewBox="0 0 15 10"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <rect width="15" height="10" fill="#000000" />
        <rect width="15" height="6.67" y="3.33" fill="#DD0000" />
        <rect width="15" height="3.33" y="6.67" fill="#FFCE00" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 15 10"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="15" height="10" fill="#FFFFFF" />
      <rect width="15" height="6.67" y="3.33" fill="#0039A6" />
      <rect width="15" height="3.33" y="6.67" fill="#D52B1E" />
    </svg>
  );
}

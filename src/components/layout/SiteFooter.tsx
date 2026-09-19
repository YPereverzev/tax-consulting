import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { getContactEmail, getContactPhone } from "@/lib/site";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const email = getContactEmail();
  const phone = getContactPhone();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-serif text-2xl">{dict.person.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-paper/75">{dict.footer.blurb}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <p className="text-xs tracking-[0.18em] text-copper uppercase">
            {dict.footer.contacts}
          </p>
          {email ? (
            <a className="w-fit hover:text-copper" href={`mailto:${email}`}>
              {email}
            </a>
          ) : (
            <p className="text-paper/70">{dict.footer.contactPending}</p>
          )}
          {phone ? (
            <a className="w-fit hover:text-copper" href={`tel:${phone.replace(/[^\d+]/g, "")}`}>
              {phone}
            </a>
          ) : null}
          <Link
            className="w-fit text-paper/70 hover:text-paper"
            href={localizedPath(locale, "privacy")}
          >
            {dict.footer.privacy}
          </Link>
        </div>
      </Container>
      <Container className="border-t border-paper/10 py-5 text-xs text-paper/55">
        © {year} {dict.person.name}. {dict.footer.rights}
      </Container>
    </footer>
  );
}

import Link from "next/link";
import { defaultLocale, localizedPath } from "@/lib/i18n/config";
import { getBasePath } from "@/lib/site";

const home = localizedPath(defaultLocale);
const homeHref = `${getBasePath()}${home}`;

export default function RootPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <meta httpEquiv="refresh" content={`0; url=${homeHref}`} />
      <p className="text-ink-muted">
        <Link href={home} className="text-forest underline-offset-4 hover:underline">
          Yuri Dmitriev
        </Link>
      </p>
    </main>
  );
}

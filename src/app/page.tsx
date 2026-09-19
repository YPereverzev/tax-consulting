import Link from "next/link";
import { defaultLocale, localizedPath } from "@/lib/i18n/config";

const home = localizedPath(defaultLocale);

export default function RootPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <meta httpEquiv="refresh" content={`0; url=${home}`} />
      <p className="text-ink-muted">
        <Link href={home} className="text-forest underline-offset-4 hover:underline">
          Yuri Dmitriev
        </Link>
      </p>
    </main>
  );
}

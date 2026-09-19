import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "onDark";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-forest text-paper hover:bg-forest-hover"
      : variant === "onDark"
        ? "border border-paper/40 bg-paper text-forest hover:bg-transparent hover:text-paper"
        : "border border-ink/15 bg-transparent text-ink hover:border-ink/40";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center px-6 text-sm font-medium tracking-wide transition-colors ${styles}`}
    >
      {children}
    </Link>
  );
}

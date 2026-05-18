import Link from "next/link";

type CtaBannerProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CtaBanner({
  title,
  description,
  primaryHref = "/contact",
  primaryLabel = "Passer une commande",
  secondaryHref = "/services",
  secondaryLabel = "Voir les options",
}: CtaBannerProps) {
  return (
    <section className="container-luxe py-12 md:py-16">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-8 py-10 text-background sm:px-10 lg:px-14 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(196,163,98,0.3),_transparent_34%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Production & vente
            </p>
            <h2 className="max-w-3xl text-balance text-4xl font-semibold sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="max-w-2xl text-base text-background/75 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href={primaryHref}
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-background hover:text-foreground"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-background transition hover:border-accent hover:text-accent"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

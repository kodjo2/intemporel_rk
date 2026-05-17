import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("container-luxe py-12 md:py-16", className)}>
      <div className="glass-panel-strong overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          {eyebrow}
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="space-y-5">
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              {description}
            </p>
          </div>
          {children ? (
            <div className="lg:justify-self-end">{children}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

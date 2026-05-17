import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-28 border-t border-border/60 bg-secondary/30"
    >
      <div className="container-luxe grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              {siteConfig.name}
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold sm:text-5xl">
              {"Couture d'allure, experience privee, precision durable."}
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Une maison de mode et couture haut de gamme qui compose des pieces
              rares, responsives a la vie reelle et pensees pour durer.
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Navigation
            </p>
            <nav aria-label="Navigation du pied de page" className="grid gap-3">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Contact
            </p>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {siteConfig.contact.address}
              </p>
              <p className="flex items-center gap-3">
                <Phone className="size-4 shrink-0" />
                {siteConfig.contact.phone}
              </p>
              <p className="flex items-center gap-3">
                <Clock3 className="size-4 shrink-0" />
                {siteConfig.contact.hours}
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="focus-ring text-sm transition hover:text-foreground"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="flex gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/80 transition hover:border-accent hover:text-accent"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  IG
                </span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/80 transition hover:border-accent hover:text-accent"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  IN
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-luxe flex flex-col gap-3 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteConfig.name}. Tous droits reserves.</p>
          <p>
            Optimise pour Vercel, SEO technique et accessibilite WCAG 2.2 AA.
          </p>
        </div>
      </div>
    </footer>
  );
}

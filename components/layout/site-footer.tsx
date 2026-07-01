import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-28 border-t border-border/60 bg-[linear-gradient(180deg,rgba(18,14,10,0.98),rgba(18,14,10,1))] text-white"
    >
      <div className="container-luxe grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f4d28b]">
              {siteConfig.name}
            </p>
            <h2 className="max-w-2xl text-4xl font-semibold sm:text-5xl">
              {"Production sur mesure, vente directe, collections controlees."}
            </h2>
            <p className="max-w-2xl text-white/68">
              Une marque orientee production et vente, avec contact direct,
              pieces visibles en ligne et informations simples avant commande.
            </p>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                Commander maintenant
              </p>
              <p className="mt-2 max-w-xl text-sm text-white/68">
                Selectionnez un modele, verifiez la disponibilite et recevez une
                reponse claire sur la production ou la livraison.
              </p>
            </div>
            <Link
              href="/payment"
              className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-[#f4d28b] px-6 text-sm font-semibold text-zinc-950 transition hover:bg-white"
            >
              Payer une commande
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "Atelier non ouvert au public",
              "Livraison locale et expedition sur demande",
              "Suivi direct apres commande",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4 text-sm text-white/68"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
              Navigation
            </p>
            <nav aria-label="Navigation du pied de page" className="grid gap-3">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring text-sm text-white/64 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
              Contact
            </p>
            <div className="grid gap-3 text-sm text-white/64">
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
                className="focus-ring text-sm transition hover:text-white"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm text-white/64">
              Confirmation du modele, de la taille, du delai et du mode de
              remise avant toute production.
            </div>
            <div className="flex gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#f4d28b] hover:text-[#f4d28b]"
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
                className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-[#f4d28b] hover:text-[#f4d28b]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  IN
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col gap-3 py-5 text-sm text-white/52 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteConfig.name}. Tous droits reserves.</p>
          <p>
            Catalogue visible en ligne, demande directe et livraison organisee
            apres validation.
          </p>
        </div>
      </div>
    </footer>
  );
}

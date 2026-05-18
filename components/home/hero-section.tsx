"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type HeroSectionProps = {
  children?: ReactNode;
};

export function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(183,140,71,0.18),_transparent_22%),linear-gradient(180deg,_rgba(250,246,239,0.98),_rgba(246,239,228,0.96))]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(17,17,17,0.03))]" />

      <div className="container-luxe relative py-28 sm:py-32 lg:py-36">
        <div className="space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                <span className="rounded-full border border-border/70 bg-background/80 px-4 py-2">
                  Nouvelle collection
                </span>
                <span>Lome, Togo</span>
                <span>•</span>
                <span>Production sur mesure et vente</span>
              </div>

              <h1 className="mt-6 max-w-4xl text-balance font-heading text-4xl font-semibold leading-[0.94] text-foreground sm:text-5xl lg:text-[4.8rem]">
                Voir les pieces, verifier la disponibilite et commander sans
                detour.
              </h1>

              <div className="mt-8 flex flex-col gap-4 rounded-[1.75rem] border border-[#dbc18f]/45 bg-[linear-gradient(135deg,rgba(255,249,238,0.82),rgba(243,229,202,0.72))] p-3 sm:flex-row sm:p-4">
                <Link
                  href="/collections"
                  className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
                >
                  Voir les pieces
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-[#c69a44]/35 bg-[#f4d28b] px-6 text-sm font-semibold text-[#1b1610] shadow-[0_14px_35px_rgba(198,154,68,0.18)] transition hover:bg-[#e8c373]"
                >
                  Passer une commande
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.25rem] border border-border/60 bg-card/80 shadow-[0_24px_90px_rgba(0,0,0,0.14)]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg"
                  alt="Modele feminin portant une robe longue graphique presentee comme piece hero du catalogue INTEMPOREL."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/88 via-black/40 to-transparent px-5 pb-5 pt-20 text-white">
                <div className="rounded-[1.6rem] border border-white/12 bg-[linear-gradient(135deg,rgba(29,24,19,0.82),rgba(95,67,30,0.58))] p-4 backdrop-blur-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                    Piece hero
                  </p>
                  <p className="mt-2 text-lg font-semibold sm:text-xl">
                    Modele visible, delai confirme avant commande.
                  </p>
                  <Link
                    href="/contact"
                    className="focus-ring mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#f4d28b] px-5 text-sm font-semibold text-[#1b1610] transition hover:bg-[#e5c06f]"
                  >
                    Commander cette piece
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}

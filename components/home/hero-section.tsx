"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categoryChips = [
  "Disponibles",
  "Sur commande",
  "Series limitees",
  "Nouveautes",
];

const spotlightItems = [
  {
    label: "Disponible",
    title: "Ligne Sable",
    meta: "Selection visible • Taille a confirmer",
  },
  {
    label: "Sur commande",
    title: "Lumiere ivoire",
    meta: "Production lancee apres validation",
  },
  {
    label: "Serie limitee",
    title: "Noir signature",
    meta: "Piece forte • Quantite controlee",
  },
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-[radial-gradient(circle_at_top_left,_rgba(183,140,71,0.18),_transparent_22%),linear-gradient(180deg,_rgba(250,246,239,0.98),_rgba(246,239,228,0.96))]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(17,17,17,0.03))]" />

      <div className="container-luxe relative py-28 sm:py-32 lg:py-36">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
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
              <p className="mt-5 max-w-3xl text-balance text-base text-muted-foreground sm:text-lg">
                INTEMPOREL presente ses collections comme une vraie vitrine:
                modeles visibles, informations utiles, delais annonces et
                contact direct pour confirmer la commande.
              </p>

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

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {categoryChips.map((category) => (
                  <div
                    key={category}
                    className="rounded-[1.35rem] border border-border/60 bg-card/80 px-4 py-4 text-sm font-semibold text-foreground shadow-sm"
                  >
                    {category}
                  </div>
                ))}
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

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4 rounded-[2rem] border border-border/60 bg-card/80 p-5 shadow-lg sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-[#151515] p-5 text-white">
                <p className="text-3xl font-semibold">50+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/65">
                  Pieces et modeles
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/60 bg-background/80 p-5">
                <p className="text-3xl font-semibold">3</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Collections
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/60 bg-background/80 p-5">
                <p className="text-3xl font-semibold">48h</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Reponse commande
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-[#151515] p-5 text-white shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                Selections du moment
              </p>
              <div className="mt-4 grid gap-3">
                {spotlightItems.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/62">
                      {item.label}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
                    <p className="mt-2 text-sm text-white/68">{item.meta}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

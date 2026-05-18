import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "A propos | INTEMPOREL",
  description:
    "Decouvrez la vision, la discipline de production et l'approche vente qui structurent INTEMPOREL.",
  path: "/about",
});

const pillars = [
  "Des collections pensees pour la vente, la petite serie et la commande sur mesure.",
  "Des coupes concues pour etre portees, produites et livrees dans un cadre clair.",
  "Une relation client simple: selection, confirmation, production et livraison.",
];

const aboutFrames = [
  {
    title: "Vision produit",
    image: "/images/OIP (13).webp",
    alt: "Modele femme portant une robe blanche ajustee sur fond sombre.",
  },
  {
    title: "Preparation",
    image: "/images/OIP (1).webp",
    alt: "Styliste en train de travailler sur des patrons dans un atelier clair.",
  },
  {
    title: "Selection",
    image: "/images/OIP (11).webp",
    alt: "Modele femme portant une robe wax courte et structuree dans des tons jaune et bordeaux.",
  },
];

const workflow = [
  "Selection d'un modele ou d'une ligne visible sur le site.",
  "Verification de la taille, de la disponibilite et du delai.",
  "Confirmation de commande, production puis livraison organisee.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="A propos"
        title="Une marque qui produit, vend et organise ses collections avec clarte."
        description="INTEMPOREL developpe des modeles feminins en production maitrisee, en petite serie ou a la commande, avec un parcours simple jusqu'a la livraison."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/collections"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
          >
            Voir les collections
          </Link>
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-border/70 px-5 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            Passer une commande
          </Link>
        </div>
      </PageHero>
      <section className="container-luxe py-6 md:py-10">
        <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-lg">
            <div className="relative aspect-[16/11]">
              <Image
                src={aboutFrames[0].image}
                alt={aboutFrames[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pb-6 pt-16 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                A propos
              </p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Une marque construite pour montrer vite, produire juste et
                livrer clairement.
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {aboutFrames.slice(1).map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/80 shadow-lg"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 28vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent">
                    {item.title}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <AnimatedSection className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Vision
            </p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
              Rendre la production sur mesure et la vente plus lisibles, plus
              nettes et plus desirables.
            </h2>
            <div className="prose-luxe mt-6 max-w-none text-base">
              <p>
                {
                  "La marque travaille des modeles feminins avec une attention forte a la coupe, a la matiere et a la finition, mais dans une logique concrete de production et de vente."
                }
              </p>
              <p>
                {
                  "Chaque ligne est pensee pour etre comprise rapidement en ligne: modele, disponibilite, delai, commande et livraison. L'atelier n'est pas ouvert au public et les demandes sont traitees directement par contact."
                }
              </p>
            </div>
            <div className="mt-8 grid gap-3 rounded-[1.6rem] border border-border/60 bg-background/70 p-5 text-sm text-muted-foreground sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Base
                </p>
                <p className="mt-2">Petites series et commandes confirmees</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Lecture
                </p>
                <p className="mt-2">Modeles, tailles et delais visibles</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Cadre
                </p>
                <p className="mt-2">Contact direct sans accueil public</p>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection
            delay={0.08}
            className="glass-panel rounded-[2rem] p-8 sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Trois principes
            </p>
            <ul className="mt-6 grid gap-4 text-muted-foreground">
              {pillars.map((pillar) => (
                <li key={pillar} className="flex gap-3">
                  <span
                    className="mt-2 size-2 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span>{pillar}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-[1.6rem] border border-border/60 bg-background/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Parcours type
              </p>
              <div className="mt-4 grid gap-3">
                {workflow.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-[1.25rem] border border-border/60 bg-card/70 p-4"
                  >
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <CtaBanner
        title="Choisir un modele, verifier une disponibilite ou demander une production sur mesure."
        description="Les demandes sont traitees directement avec confirmation du modele, de la taille, du delai et du mode de livraison avant validation."
      />
    </>
  );
}

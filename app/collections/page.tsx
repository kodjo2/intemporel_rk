import Link from "next/link";
import Image from "next/image";

import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { CollectionLookGallery } from "@/features/collections/collection-look-gallery";
import { collections } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

const collectionHighlights = [
  {
    title: "Preparation & coupe",
    meta: "Processus",
    image: "/images/OIP (1).webp",
    alt: "Styliste en train de travailler sur des patrons dans un atelier clair.",
  },
  {
    title: "Selection forte",
    meta: "Disponible",
    image: "/images/OIP (11).webp",
    alt: "Modele femme portant une robe wax courte et structuree dans des tons jaune et bordeaux.",
  },
  {
    title: "Capsule claire",
    meta: "Serie limitee",
    image: "/images/OIP (13).webp",
    alt: "Modele femme portant une robe blanche ajustee sur fond sombre.",
  },
  {
    title: "Ligne vedette",
    meta: "Sur commande",
    image: "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
    alt: "Modele portant une robe longue bleue et beige a motif graphique sur podium.",
  },
];

export const metadata = buildMetadata({
  title: "Collections | INTEMPOREL",
  description:
    "Collections et modeles disponibles a la commande, presentes comme un catalogue simple, clair et direct.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Des collections presentees comme des modeles a voir, choisir et commander."
        description="La page montre les lignes disponibles, les visuels, les informations utiles et le chemin le plus court vers une commande ou une demande de disponibilite."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
          >
            Commander une collection
          </Link>
          <Link
            href="/#collections"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-border/70 px-5 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            Retour a la selection
          </Link>
        </div>
      </PageHero>

      <section className="container-luxe py-6 md:py-8">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            "Collections organisees pour la vente et la commande sur mesure.",
            "Details, visuels et matieres visibles avant prise de contact.",
            "Parcours court vers commande, disponibilite ou livraison.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.4rem] border border-border/60 bg-card/70 p-4 text-sm text-muted-foreground shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-6 md:py-10">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-lg">
            <div className="relative aspect-[16/11]">
              <Image
                src={collectionHighlights[0].image}
                alt={collectionHighlights[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-6 pb-6 pt-16 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                {collectionHighlights[0].meta}
              </p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                {collectionHighlights[0].title}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/74 sm:text-base">
                Une entree visuelle plus riche pour montrer qu&apos;il y a a la
                fois des modeles, des capsules et un vrai travail de production.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {collectionHighlights.slice(1).map((item) => (
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
                <div className="space-y-2 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-accent">
                    {item.meta}
                  </p>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-6">
          {collections.map((collection, index) => (
            <AnimatedSection key={collection.slug} delay={index * 0.06}>
              <article
                id={collection.slug}
                className="grid overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-lg lg:grid-cols-[0.95fr_1.05fr]"
              >
                <div className="grid gap-3 p-3 sm:p-4">
                  <div className="relative min-h-[22rem] overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={collection.image}
                      alt={collection.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {collection.looks.slice(0, 2).map((look) => (
                      <div
                        key={look.name}
                        className="relative min-h-[11rem] overflow-hidden rounded-[1.35rem] border border-border/60"
                      >
                        <Image
                          src={look.image}
                          alt={look.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 20vw"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 text-white">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                            {look.piece}
                          </p>
                          <p className="mt-1 text-sm font-semibold">
                            {look.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6 p-7 sm:p-9">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                      {collection.season}
                    </p>
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h2 className="text-4xl font-semibold sm:text-5xl">
                          {collection.title}
                        </h2>
                        <p className="mt-3 max-w-2xl text-muted-foreground">
                          {collection.description}
                        </p>
                      </div>
                      <div className="rounded-[1.35rem] border border-border/60 bg-background/70 px-4 py-3 text-sm">
                        <p className="font-semibold text-foreground">
                          A partir de 120 000 FCFA
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          Commande directe ou production sur mesure
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                    {[
                      collection.season,
                      "Disponible sur demande",
                      "Livraison organisee",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/70 bg-background/70 px-4 py-2"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="grid gap-3 rounded-[1.5rem] border border-border/60 bg-background/70 p-5 text-sm text-muted-foreground sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        Usage
                      </p>
                      <p className="mt-2">Vente, commande ou petite serie</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        Disponibilite
                      </p>
                      <p className="mt-2">
                        Disponible, sur commande ou en production
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                        Parcours
                      </p>
                      <p className="mt-2">
                        Contact direct et cadrage de besoin
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {collection.pillars.map((pillar) => (
                      <span
                        key={pillar}
                        className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>

                  <div className="rounded-[1.5rem] border border-border/60 bg-background/70 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                      Direction
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {collection.description}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {collection.direction}
                    </p>
                  </div>

                  <CollectionLookGallery
                    looks={collection.looks}
                    collectionTitle={collection.title}
                  />

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
                    >
                      Commander cette ligne
                    </Link>
                    <Link
                      href="/#testimonials"
                      className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-border/70 px-5 text-sm font-medium transition hover:border-accent hover:text-accent"
                    >
                      Voir les avis
                    </Link>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Commander une collection, verifier un modele ou lancer une petite production."
        description="Chaque demande est traitee avec un cadre simple: confirmation du modele, taille, quantite, delai et mode de livraison avant production."
      />
    </>
  );
}

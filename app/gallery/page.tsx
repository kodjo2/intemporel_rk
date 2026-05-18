import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/shared/animated-section";
import { PageHero } from "@/components/shared/page-hero";
import { GalleryShowcase } from "@/features/gallery/gallery-showcase";
import { galleryItems } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

const galleryFrames = [
  {
    title: "Nouveautes visibles",
    image: "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
    alt: "Modele portant une robe longue bleue et beige a motif graphique sur podium.",
  },
  {
    title: "Production",
    image: "/images/OIP (1).webp",
    alt: "Styliste en train de travailler sur des patrons dans un atelier clair.",
  },
  {
    title: "Serie limitee",
    image: "/images/OIP (13).webp",
    alt: "Modele femme portant une robe blanche ajustee sur fond sombre.",
  },
];

const gallerySignals = [
  "Filtres par statut pour aller vite vers le bon modele.",
  "Ouverture en detail pour voir la piece avant contact.",
  "Melange entre visuels de collection et etapes de production.",
];

export const metadata = buildMetadata({
  title: "Galerie | INTEMPOREL",
  description:
    "Galerie des modeles, collections et etapes de production d'INTEMPOREL.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Des images pour voir les modeles, les collections et le travail de production."
        description="Filtrez la galerie pour consulter les pieces, les selections disponibles et quelques apercus du processus de production."
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
            Demander une disponibilite
          </Link>
        </div>
      </PageHero>

      <section className="container-luxe py-6 md:py-10">
        <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-lg">
            <div className="relative aspect-[16/11]">
              <Image
                src={galleryFrames[0].image}
                alt={galleryFrames[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pb-6 pt-16 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                Galerie produit
              </p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Une galerie qui sert a choisir, comparer et confirmer une piece.
              </h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {galleryFrames.slice(1).map((item) => (
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

      <section className="container-luxe py-2 md:py-4">
        <AnimatedSection>
          <div className="grid gap-3 rounded-[2rem] border border-border/60 bg-[linear-gradient(135deg,rgba(14,14,14,0.98),rgba(38,31,24,0.96)_58%,rgba(14,14,14,0.98))] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.18)] sm:grid-cols-3 sm:p-7">
            {gallerySignals.map((item) => (
              <div
                key={item}
                className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4 text-sm text-white/74"
              >
                {item}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="container-luxe py-12 md:py-16">
        <GalleryShowcase items={galleryItems} />
      </section>
    </>
  );
}

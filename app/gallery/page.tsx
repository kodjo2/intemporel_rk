import { PageHero } from "@/components/shared/page-hero";
import { galleryItems } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

import { GalleryShowcase } from "@/features/gallery/gallery-showcase";

export const metadata = buildMetadata({
  title: "Galerie | INTEMPOREL",
  description:
    "Galerie mode et couture premium: editorial, atelier, silhouettes signatures et runway d'INTEMPOREL.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Une mise en image qui traduit l'exigence, la fluidite et la precision du geste couture."
        description="Filtrez les univers visuels de la maison et ouvrez chaque image dans une lightbox immersive et accessible."
      />
      <section className="container-luxe py-12 md:py-16">
        <GalleryShowcase items={galleryItems} />
      </section>
    </>
  );
}

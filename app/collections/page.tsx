import Link from "next/link";
import Image from "next/image";

import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { CollectionLookGallery } from "@/features/collections/collection-look-gallery";
import { collections } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Collections | INTEMPOREL",
  description:
    "Collections couture pensees comme des directions de style distinctes pour ceremonie, capsule privee et image editoriale.",
  path: "/collections",
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Trois lignes de collection pour organiser la desirabilite, l'usage et la singularite."
        description="Chaque direction de collection fixe une ecriture visuelle, une palette matiere et un cadre d'accompagnement adapte au projet."
      >
        <Link
          href="/contact"
          className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
        >
          Discuter d'une collection
        </Link>
      </PageHero>

      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-6">
          {collections.map((collection, index) => (
            <AnimatedSection key={collection.slug} delay={index * 0.06}>
              <article
                id={collection.slug}
                className="grid overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-lg lg:grid-cols-[0.95fr_1.05fr]"
              >
                <div className="relative min-h-[22rem] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
                <div className="space-y-6 p-7 sm:p-9">
                  <div className="space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                      {collection.season}
                    </p>
                    <h2 className="text-4xl font-semibold sm:text-5xl">
                      {collection.title}
                    </h2>
                    <p className="max-w-2xl text-muted-foreground">
                      {collection.description}
                    </p>
                  </div>

                  <CollectionLookGallery
                    looks={collection.looks}
                    collectionTitle={collection.title}
                  />

                  <div className="rounded-[1.5rem] border border-border/60 bg-background/70 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                      Direction
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {collection.direction}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                      Piliers de collection
                    </p>
                    <ul className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                      {collection.pillars.map((pillar) => (
                        <li
                          key={pillar}
                          className="flex gap-3 rounded-[1.25rem] border border-border/60 bg-background/60 p-4"
                        >
                          <span
                            className="mt-1.5 size-1.5 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          <span>{pillar}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Construire une collection capsule, ceremonielle ou editoriale avec un cadre clair et un rythme realiste."
        description="INTEMPOREL accompagne la direction, le developpement et les essayages avec le meme niveau d'exigence que pour une commande sur mesure individuelle."
      />
    </>
  );
}

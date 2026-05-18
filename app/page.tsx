import Image from "next/image";
import Link from "next/link";

import { HeroSection } from "@/components/home/hero-section";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { StructuredData } from "@/components/shared/structured-data";
import { GalleryShowcase } from "@/features/gallery/gallery-showcase";
import { TestimonialForm } from "@/features/testimonials/testimonial-form";
import {
  collections,
  galleryItems,
  services,
  showcasedGarments,
  stats,
  testimonials,
} from "@/lib/data";
import { siteConfig } from "@/lib/site";

const trustItems = [
  "Livraison sur Lome et expedition sur demande",
  "Commande confirmee apres validation du modele",
  "Ajustements possibles selon taille et disponibilite",
  "Contact direct WhatsApp, email ou formulaire",
];

const productShades = ["Noir profond", "Sable", "Ivoire"];

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
        }}
      />

      <section id="home" className="scroll-mt-28">
        <HeroSection>
          <div
            id="gallery"
            className="space-y-6 rounded-[2rem] border border-border/60 bg-card/75 p-5 shadow-lg sm:p-6"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Catalogue filtre"
                title="Filtrer les modeles par statut pour aller vite vers la bonne piece."
              />
              <Link
                href="/collections"
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-border/70 bg-background/80 px-5 text-sm font-medium transition hover:border-accent hover:text-accent lg:self-start"
              >
                Catalogue
              </Link>
            </div>
            <GalleryShowcase items={galleryItems} />
          </div>
        </HeroSection>
      </section>

      <section
        id="about"
        className="container-luxe scroll-mt-28 py-10 md:py-16"
      >
        <AnimatedSection animate={false}>
          <div className="space-y-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Selection a la une"
                title="Des pieces visibles tout de suite, avec statut, matiere et action directe."
              />
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                {[
                  "Pieces fortes",
                  "Disponibles",
                  "Sur commande",
                  "Series limitees",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/70 bg-background/80 px-4 py-2"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {showcasedGarments.map((garment, index) => (
                <AnimatedSection
                  key={garment.title}
                  delay={index * 0.04}
                  animate={false}
                >
                  <article className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-lg">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={garment.image}
                        alt={garment.alt}
                        fill
                        className="object-cover transition duration-700 hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    <div className="space-y-4 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                            {garment.category}
                          </p>
                          <h3 className="mt-3 text-3xl font-semibold">
                            {garment.title}
                          </h3>
                        </div>
                        <p className="text-sm font-semibold text-accent">
                          {garment.availability}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {garment.description}
                      </p>
                      <div className="grid gap-2 rounded-[1.25rem] border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
                        <p>
                          <span className="font-semibold text-foreground">
                            Matiere:{" "}
                          </span>
                          {garment.material}
                        </p>
                        <p>
                          <span className="font-semibold text-foreground">
                            Disponibilite:{" "}
                          </span>
                          {garment.availability}
                        </p>
                      </div>
                      <Link
                        href="/contact"
                        className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
                      >
                        Commander ce modele
                      </Link>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <section className="container-luxe py-8 md:py-14">
        <AnimatedSection animate={false}>
          <div className="grid gap-6 rounded-[2.25rem] border border-border/60 bg-[linear-gradient(135deg,rgba(14,14,14,0.98),rgba(38,31,24,0.96)_58%,rgba(14,14,14,0.98))] px-6 py-7 text-white shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:px-8 sm:py-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f4d28b]">
                Signaux de confiance
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Livraison encadree, prise de mesure, echanges et suivi visibles
                sans chercher.
              </h2>
              <p className="mt-4 max-w-2xl text-sm text-white/74 sm:text-base">
                Les informations qui freinent le plus une commande sont deja
                affichees ici: canal de contact, confirmation, delais et mode de
                remise.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4 text-sm text-white/74"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <div id="collections" className="scroll-mt-28" />

      <section className="container-luxe py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <AnimatedSection animate={false}>
            <div className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-card/85 shadow-lg">
              <div className="grid gap-4 p-4 sm:grid-cols-[0.72fr_0.28fr] sm:p-5">
                <div className="relative overflow-hidden rounded-[1.75rem]">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg"
                      alt="Modele bleu presente comme piece vedette du catalogue en ligne."
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  {collections.slice(0, 2).map((collection) => (
                    <div
                      key={collection.slug}
                      className="relative overflow-hidden rounded-[1.5rem]"
                    >
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={collection.image}
                          alt={collection.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 14vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08} animate={false}>
            <div className="glass-panel rounded-[2.25rem] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">
                Produit signature
              </p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                Une fiche produit lisible, avec les infos utiles avant prise de
                contact.
              </h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                Prix indicatif, disponibilite, guide de taille et delai restent
                visibles au meme endroit pour reduire les allers-retours avant
                validation.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {productShades.map((shade) => (
                  <span
                    key={shade}
                    className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]"
                  >
                    {shade}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 rounded-[1.6rem] border border-border/60 bg-background/70 p-5 text-sm text-muted-foreground">
                <div className="flex items-center justify-between gap-4">
                  <span>Prix indicatif</span>
                  <span className="font-semibold text-foreground">
                    A partir de 120 000 FCFA
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Disponibilite</span>
                  <span className="font-semibold text-foreground">
                    Serie limitee
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Canal</span>
                  <span className="font-semibold text-foreground">
                    WhatsApp ou formulaire
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <details
                  className="rounded-[1.35rem] border border-border/60 bg-background/80 p-5"
                  open
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                    Guide de tailles
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Verification de taille et ajustements selon le modele avant
                    lancement en production.
                  </p>
                </details>
                <details className="rounded-[1.35rem] border border-border/60 bg-background/80 p-5">
                  <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                    Livraison et delais
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Remise locale a Lome, expedition sur demande et calendrier
                    annonce des le debut du projet.
                  </p>
                </details>
                <details className="rounded-[1.35rem] border border-border/60 bg-background/80 p-5">
                  <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                    Echanges et retouches
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Ajustements prevus selon le type de commande, avec suivi
                    direct apres premier essayage.
                  </p>
                </details>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
                >
                  Commander ce modele
                </Link>
                <Link
                  href="/collections"
                  className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-border/70 px-5 text-sm font-semibold transition hover:border-accent hover:text-accent"
                >
                  Voir les variantes
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section
        id="services"
        className="container-luxe scroll-mt-28 py-12 md:py-18"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.title}
              delay={index * 0.05}
              animate={false}
            >
              <article className="glass-panel rounded-[1.75rem] p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  Service {index + 1}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  {service.details.slice(0, 2).map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span
                        className="mt-2 size-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="container-luxe py-12 md:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <AnimatedSection
              key={collection.slug}
              delay={index * 0.05}
              animate={false}
            >
              <article className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-lg">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                    {collection.season}
                  </p>
                  <h3 className="text-3xl font-semibold">{collection.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {collection.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {collection.direction}
                  </p>
                  <Link
                    href={`/collections#${collection.slug}`}
                    className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-border/70 px-5 text-sm font-semibold transition hover:border-accent hover:text-accent"
                  >
                    Ouvrir cette ligne
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section
        id="testimonials"
        className="container-luxe scroll-mt-28 py-12 md:py-20"
      >
        <div className="overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(180deg,rgba(250,246,239,0.95),rgba(241,233,220,0.98))] px-6 py-8 text-foreground shadow-[0_30px_120px_rgba(0,0,0,0.08)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-3xl space-y-4">
            <div
              id="testimonials-carousel"
              className="overflow-hidden rounded-[1.7rem] border border-zinc-900/80 bg-[radial-gradient(circle_at_top_left,_rgba(214,174,84,0.18),_transparent_28%),linear-gradient(135deg,_rgba(18,18,18,1),_rgba(39,27,15,0.96)_58%,_rgba(18,18,18,1))] p-3.5 sm:p-4 text-white"
            >
              <TestimonialsCarousel items={testimonials} />
            </div>
            <details
              id="testimonial-form"
              className="group rounded-[1.7rem] border border-border/60 bg-[linear-gradient(180deg,rgba(252,247,239,0.96),rgba(241,232,216,0.92))] p-4 sm:p-5"
            >
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-[1.2rem] border border-[#c69a44]/35 bg-[#f4d28b] px-4 py-3 text-sm font-semibold text-[#1b1610] shadow-[0_14px_35px_rgba(198,154,68,0.18)] transition hover:bg-[#e8c373]">
                <span className="font-heading text-[0.98rem] tracking-[0.01em]">
                  Laisser un avis
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#6f5420] transition group-open:rotate-45 group-open:text-[#8a671f]">
                  +
                </span>
              </summary>
              <div className="mt-4 rounded-[1.35rem] border border-[#d8bb85]/40 bg-[rgba(255,250,241,0.72)] p-4 sm:p-5">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7428]">
                    Write a review
                  </p>
                  <p className="mt-2 text-sm text-[#5f5137]">
                    Partagez votre experience de commande, de finition ou de
                    livraison.
                  </p>
                </div>
                <TestimonialForm />
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}

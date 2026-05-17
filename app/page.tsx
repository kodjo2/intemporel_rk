import Image from "next/image";
import Link from "next/link";

import { HeroSection } from "@/components/home/hero-section";
import { StatsGrid } from "@/components/home/stats-grid";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { SectionHeading } from "@/components/shared/section-heading";
import { StructuredData } from "@/components/shared/structured-data";
import { TestimonialForm } from "@/features/testimonials/testimonial-form";
import { GalleryShowcase } from "@/features/gallery/gallery-showcase";
import {
  brandStory,
  galleryItems,
  services,
  showcasedGarments,
  stats,
  testimonials,
} from "@/lib/data";
import { siteConfig } from "@/lib/site";

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
        <HeroSection />
      </section>

      <section
        id="gallery"
        className="container-luxe scroll-mt-28 py-10 md:py-14"
      >
        <AnimatedSection>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                Galerie modele
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Quelques silhouettes en image.
              </h2>
            </div>
            <Link
              href="/gallery"
              className="focus-ring hidden min-h-11 items-center rounded-full border border-border/70 px-5 text-sm font-semibold transition hover:border-accent hover:text-accent sm:inline-flex"
            >
              Ouvrir la galerie
            </Link>
          </div>
          <div className="mt-8">
            <GalleryShowcase
              items={galleryItems}
              limit={9}
              showFilters={false}
            />
          </div>
        </AnimatedSection>
      </section>

      <section
        id="about"
        className="container-luxe scroll-mt-28 py-14 md:py-18"
      >
        <AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
              <SectionHeading
                eyebrow="Couture signature"
                title="La vision INTEMPOREL et ses services essentiels, reunis dans un meme resume."
                description="Une maison de couture qui travaille des silhouettes nettes, des matieres fortes et un accompagnement prive, du premier echange au tombant final."
              />
            </div>
            <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                Manifesto
              </p>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                {brandStory.description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {
                  "L'approche INTEMPOREL cherche moins l'effet que la justesse: coupe, tenue du tissu, accompagnement et finition dans un format volontairement sobre."
                }
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div id="services" className="scroll-mt-28" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.05}>
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

      <section
        id="collections"
        className="container-luxe scroll-mt-28 py-12 md:py-20"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Pieces a exposer"
            title="Un espace pour presenter les vetements que vous souhaitez mettre en avant."
            description="Cette section peut servir a exposer des pieces phares, une capsule saisonniere ou une selection speciale sur la page d'accueil."
          />
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-border/70 px-5 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            Mettre une piece en avant
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {showcasedGarments.map((garment, index) => (
            <AnimatedSection key={garment.title} delay={index * 0.05}>
              <article className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/75 shadow-lg">
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
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                    {garment.category}
                  </p>
                  <h3 className="text-3xl font-semibold">{garment.title}</h3>
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
                        Statut:{" "}
                      </span>
                      {garment.availability}
                    </p>
                  </div>
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
        <div className="overflow-hidden rounded-[2.5rem] border border-zinc-900/80 bg-[radial-gradient(circle_at_top_left,_rgba(214,174,84,0.22),_transparent_28%),linear-gradient(135deg,_rgba(18,18,18,1),_rgba(39,27,15,0.96)_58%,_rgba(18,18,18,1))] px-6 py-8 text-white shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionHeading
              eyebrow="Temoignages"
              title="Des retours clients, avec un espace simple pour laisser le votre."
              className="[&_h2]:text-3xl sm:[&_h2]:text-4xl lg:[&_h2]:text-5xl"
            />
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/72 lg:justify-end">
              <a
                href="#testimonials-carousel"
                className="focus-ring rounded-full border border-white/12 bg-white/6 px-4 py-2 transition hover:border-[#f4d28b] hover:text-[#f4d28b]"
              >
                Avis courts
              </a>
              <a
                href="#testimonial-form"
                className="focus-ring rounded-full border border-white/12 bg-white/6 px-4 py-2 transition hover:border-[#f4d28b] hover:text-[#f4d28b]"
              >
                Envoi direct
              </a>
            </div>
          </div>
          <div className="mt-8 space-y-6">
            <div
              id="testimonials-carousel"
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/10 p-4 sm:p-5"
            >
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f4d28b]">
                  Avis en vedette
                </p>
              </div>
              <TestimonialsCarousel items={testimonials} />
            </div>
            <div
              id="testimonial-form"
              className="rounded-[2rem] border border-white/12 bg-white/6 p-5 sm:p-6"
            >
              <div>
                <TestimonialForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-luxe py-12 md:py-20">
        <SectionHeading
          eyebrow="Impact mesurable"
          title="Une maison exigeante, structuree pour allier desirabilite, fiabilite et precision."
          description="Ces indicateurs traduisent la regularite de l'experience atelier et la capacite de production sur mesure."
        />
        <div className="mt-10">
          <StatsGrid items={stats} />
        </div>
      </section>

      <CtaBanner
        title="Composer une piece, une silhouette ou une capsule privee sur rendez-vous."
        description="L'atelier accompagne les projets sur mesure, bridal et image premium avec un calendrier, une direction artistique et un niveau de finition dignes des grandes maisons contemporaines."
      />
    </>
  );
}

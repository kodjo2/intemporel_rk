import Image from "next/image";
import Link from "next/link";

import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { TestimonialForm } from "@/features/testimonials/testimonial-form";
import { testimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

const reviewSignals = [
  "Avis lisibles avant de lancer une commande.",
  "Retour sur la clarte, la finition et la livraison.",
  "Envoi direct d'un temoignage depuis le site.",
];

export const metadata = buildMetadata({
  title: "Temoignages | INTEMPOREL",
  description:
    "Temoignages clients autour des commandes, des modeles disponibles et de la production sur mesure d'INTEMPOREL.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Temoignages"
        title="Des retours clients qui parlent de commande, de rendu et de fiabilite."
        description="Les avis portent sur la clarte du parcours, la conformite des modeles, la finition et l'organisation de la livraison."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="#avis-clients"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
          >
            Lire les avis
          </Link>
          <Link
            href="#formulaire-avis"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-border/70 px-5 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            Laisser un temoignage
          </Link>
        </div>
      </PageHero>

      <section className="container-luxe py-6 md:py-10">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 shadow-lg">
            <div className="relative aspect-[16/11]">
              <Image
                src="/images/OIP (11).webp"
                alt="Modele femme portant une robe wax courte et structuree dans des tons jaune et bordeaux."
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 54vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 pb-6 pt-16 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                Preuve sociale
              </p>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Une page d&apos;avis qui confirme la qualite du parcours, pas
                seulement du style.
              </h2>
            </div>
          </div>
          <div className="grid gap-3 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg sm:grid-cols-3 lg:grid-cols-1 lg:p-7">
            {reviewSignals.map((item) => (
              <div
                key={item}
                className="rounded-[1.35rem] border border-border/60 bg-card/70 p-4 text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="avis-clients" className="container-luxe py-6 md:py-10">
        <div className="overflow-hidden rounded-[2.25rem] border border-zinc-900/80 bg-[radial-gradient(circle_at_top_left,_rgba(214,174,84,0.22),_transparent_28%),linear-gradient(135deg,_rgba(18,18,18,1),_rgba(39,27,15,0.96)_58%,_rgba(18,18,18,1))] px-6 py-8 text-white shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f4d28b]">
                Avis en vedette
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Des retours courts, visibles et faciles a parcourir.
              </h2>
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">
              Satisfaction, finition et delai
            </div>
          </div>
          <div className="mt-8">
            <TestimonialsCarousel items={testimonials} />
          </div>
        </div>
      </section>

      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} delay={index * 0.05}>
              <article className="glass-panel rounded-[2rem] p-8">
                <p className="text-3xl font-semibold leading-relaxed">
                  “{testimonial.quote}”
                </p>
                <div className="mt-6 border-t border-border/60 pt-5">
                  <p className="text-lg font-semibold">{testimonial.name}</p>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section id="formulaire-avis" className="container-luxe py-4 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="glass-panel rounded-[2rem] p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Partager votre retour
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Un formulaire simple pour ajouter un avis client verifie.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Le temoignage doit surtout parler de la clarte du contact, du
              rendu final, du delai et de l&apos;organisation de la livraison.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-zinc-900/80 bg-[radial-gradient(circle_at_top_left,_rgba(214,174,84,0.22),_transparent_28%),linear-gradient(135deg,_rgba(18,18,18,1),_rgba(39,27,15,0.96)_58%,_rgba(18,18,18,1))] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:p-8">
            <TestimonialForm />
          </div>
        </div>
      </section>

      <CtaBanner
        title="Verifier une disponibilite, lire les avis ou passer directement une commande."
        description="Les temoignages confirment surtout la lisibilite du parcours, la qualite de finition et l'organisation jusqu'a la livraison."
      />
    </>
  );
}

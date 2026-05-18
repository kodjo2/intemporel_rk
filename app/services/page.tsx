import Image from "next/image";
import Link from "next/link";

import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { services } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

const serviceHighlights = [
  {
    title: "Disponibilite verifiee",
    text: "Les modeles, tailles et delais sont clarifies avant validation.",
  },
  {
    title: "Commande directe",
    text: "WhatsApp, email ou formulaire pour lancer la demande sans detour.",
  },
  {
    title: "Livraison organisee",
    text: "Remise locale ou expedition selon la commande confirmee.",
  },
];

const serviceVisuals = [
  {
    image: "/images/OIP (1).webp",
    alt: "Styliste en train de travailler sur des patrons dans un atelier clair.",
    label: "Production sur mesure",
  },
  {
    image: "/images/OIP (11).webp",
    alt: "Modele femme portant une robe wax courte et structuree dans des tons jaune et bordeaux.",
    label: "Pieces disponibles",
  },
  {
    image: "/images/OIP (13).webp",
    alt: "Modele femme portant une robe blanche ajustee sur fond sombre.",
    label: "Series limitees",
  },
  {
    image: "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
    alt: "Modele portant une robe longue bleue et beige a motif graphique sur podium.",
    label: "Commande a distance",
  },
];

export const metadata = buildMetadata({
  title: "Services | INTEMPOREL",
  description:
    "Production sur mesure, vente de modeles disponibles, series limitees et commande a distance.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Des options claires pour produire, vendre et commander sans confusion."
        description="Chaque service explique ce qui est possible: commande directe, production sur mesure, petite serie ou demande a distance."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
          >
            Demarrer une demande
          </Link>
          <Link
            href="/collections"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-border/70 px-5 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            Voir les modeles
          </Link>
        </div>
      </PageHero>
      <section className="container-luxe py-6 md:py-10">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceVisuals.map((item) => (
              <article
                key={item.label}
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
                    {item.label}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <AnimatedSection className="overflow-hidden rounded-[2rem] border border-border/60 bg-[linear-gradient(135deg,rgba(14,14,14,0.98),rgba(38,31,24,0.96)_58%,rgba(14,14,14,0.98))] p-7 text-white shadow-[0_30px_120px_rgba(0,0,0,0.22)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f4d28b]">
              Cadre de service
            </p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Une page service qui rassure, montre et oriente vite vers la bonne
              demande.
            </h2>
            <div className="mt-6 grid gap-3">
              {serviceHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-white/72">{item.text}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 0.06}>
              <article className="glass-panel rounded-[2rem] p-7 sm:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                  Service {index + 1}
                </p>
                <h2 className="mt-4 text-4xl font-semibold">{service.title}</h2>
                <p className="mt-4 text-muted-foreground">
                  {service.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                  {[
                    "Validation directe",
                    "Delai annonce",
                    "Livraison organisee",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <ul className="mt-6 grid gap-3 text-sm text-muted-foreground">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span
                        className="mt-2 size-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-[1.5rem] border border-border/60 bg-background/70 p-5 text-sm text-muted-foreground">
                  {index === 0
                    ? "Ideal pour adapter un modele, confirmer une taille et lancer une production apres validation."
                    : index === 1
                      ? "Ideal si vous voulez verifier rapidement une piece deja visible et organiser la remise ou l'expedition."
                      : index === 2
                        ? "Ideal pour proposer une capsule plus resserree avec quantites controlees et renouvellement selon la demande."
                        : "Ideal si vous commandez a distance et avez besoin d'un parcours clair du premier message a la livraison."}
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>
      <CtaBanner
        title="Choisir l'option la plus adaptee a votre modele, votre quantite et votre delai."
        description="INTEMPOREL vous oriente vers le bon format selon la disponibilite, la production necessaire et le mode de livraison souhaite."
      />
    </>
  );
}

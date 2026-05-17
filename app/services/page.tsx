import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { services } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services | INTEMPOREL",
  description:
    "Couture sur mesure, bridal couture, garde-robe capsule et consulting image pour une clientele premium.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Une offre couture et image construite pour l'exigence, pas pour l'improvisation."
        description="Chaque service articule direction artistique, execution technique et experience client premium."
      />
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
              </article>
            </AnimatedSection>
          ))}
        </div>
      </section>
      <CtaBanner
        title="Discuter du service le plus adapte a votre agenda, votre silhouette et votre niveau d'exigence."
        description="L'atelier vous oriente vers le bon format selon la temporalite, l'usage et l'intensite du projet."
      />
    </>
  );
}

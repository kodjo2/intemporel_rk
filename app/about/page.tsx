import { AnimatedSection } from "@/components/shared/animated-section";
import { CtaBanner } from "@/components/shared/cta-banner";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "A propos | INTEMPOREL",
  description:
    "Decouvrez la vision, la discipline artisanale et l'experience privee qui structurent INTEMPOREL.",
  path: "/about",
});

const pillars = [
  "Une direction artistique nette, inspiree des maisons de couture modernes.",
  "Des coupes pensees pour le mouvement reel, pas seulement pour l'image.",
  "Une relation client fondee sur l'ecoute, la precision et la discretion.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="A propos"
        title="Une maison qui traite chaque silhouette comme une edition d'auteur."
        description="INTEMPOREL croise la rigueur du tailoring, la sensibilite du sur-mesure et l'exigence d'une experience privee haut de gamme."
      />
      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <AnimatedSection className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Vision
            </p>
            <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
              Rendre la couture contemporaine, portable et memorisable.
            </h2>
            <div className="prose-luxe mt-6 max-w-none text-base">
              <p>
                {
                  "La maison developpe un langage ou le luxe n'est jamais demonstratif. Il reside dans la justesse de la coupe, dans la tenue du tissu, dans la precision du montage et dans la qualite de l'accompagnement."
                }
              </p>
              <p>
                {
                  "Cette exigence permet de creer des pieces capables de traverser les usages: ceremonie, scene publique, quotidien de direction ou capsule de vestiaire."
                }
              </p>
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
          </AnimatedSection>
        </div>
      </section>
      <CtaBanner
        title="Rencontrer l'atelier pour definir une vision, une coupe et un calendrier de creation."
        description="Les entretiens prives permettent d'ouvrir le dialogue sur l'allure, l'usage, les references et la temporalite du projet."
      />
    </>
  );
}

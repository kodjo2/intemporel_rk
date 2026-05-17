import { AnimatedSection } from "@/components/shared/animated-section";
import { PageHero } from "@/components/shared/page-hero";
import { testimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Temoignages | INTEMPOREL",
  description:
    "Temoignages clients autour de la couture sur mesure, du bridal couture et des capsules premium d'INTEMPOREL.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Temoignages"
        title="Des retours d'experience qui parlent autant de coupe que de confiance."
        description="Chaque cliente vit la maison differemment, mais toutes attendent le meme niveau d'exigence: clarte, justesse, finition et calme."
      />
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
    </>
  );
}

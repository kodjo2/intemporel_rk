import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/features/contact/contact-form";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact | INTEMPOREL",
  description:
    "Prenez rendez-vous avec INTEMPOREL pour un projet couture sur mesure, bridal ou capsule haut de gamme.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ouvrir un projet prive avec l'atelier."
        description="Decrivez votre besoin, votre calendrier et l'esthetique recherchee. Une reponse claire vous est apportee sous 24 heures ouvrables."
      >
        <div className="grid gap-3 rounded-[1.5rem] border border-border/60 bg-background/80 p-5 text-sm text-muted-foreground">
          <p className="flex gap-3">
            <MapPin className="size-4 shrink-0" /> {siteConfig.contact.address}
          </p>
          <p className="flex gap-3">
            <Phone className="size-4 shrink-0" /> {siteConfig.contact.phone}
          </p>
          <p className="flex gap-3">
            <Mail className="size-4 shrink-0" /> {siteConfig.contact.email}
          </p>
        </div>
      </PageHero>
      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <h2 className="text-4xl font-semibold">
              Formulaire de demande intelligent
            </h2>
            <p className="mt-4 text-muted-foreground">
              Le formulaire est valide cote client et cote serveur, avec champ
              honeypot, messages explicites et zones cliquables confortables
              pour mobile.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <aside className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Cadre de travail
            </p>
            <ul className="mt-6 grid gap-4 text-muted-foreground">
              <li>Consultation initiale privee en presentiel ou a distance.</li>
              <li>Recommandation de service et estimation de calendrier.</li>
              <li>Essayages, suivi matieres et coordination des jalons.</li>
              <li>Confidentialite et discretion a chaque etape du projet.</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}

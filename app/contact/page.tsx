import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/features/contact/contact-form";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const contactSignals = [
  "Reponse sous 24 heures ouvrables.",
  "Verification de taille, disponibilite et delai avant validation.",
  "Remise locale ou expedition organisee selon la commande.",
];

const orderSteps = [
  "Vous indiquez le modele, la taille, la quantite ou le besoin de production.",
  "INTEMPOREL confirme la disponibilite, le delai et le mode de livraison.",
  "La commande est validee puis suivie jusqu'au retrait ou a l'expedition.",
];

export const metadata = buildMetadata({
  title: "Contact | INTEMPOREL",
  description:
    "Contactez INTEMPOREL pour une commande, une demande de disponibilite ou une production sur mesure.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Passer une commande ou demander une disponibilite."
        description="Decrivez le modele souhaite, la taille, la quantite ou le delai. L'atelier n'est pas ouvert au public: les demandes sont traitees directement par contact."
      >
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="grid gap-3 rounded-[1.5rem] border border-border/60 bg-background/80 p-5 text-sm text-muted-foreground">
            <p className="flex gap-3">
              <MapPin className="size-4 shrink-0" />{" "}
              {siteConfig.contact.address}
            </p>
            <p className="flex gap-3">
              <Phone className="size-4 shrink-0" /> {siteConfig.contact.phone}
            </p>
            <p className="flex gap-3">
              <Mail className="size-4 shrink-0" /> {siteConfig.contact.email}
            </p>
            <Link
              href="/collections"
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
            >
              Voir le catalogue
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/80 shadow-lg">
            <div className="relative aspect-[16/11] lg:aspect-auto lg:min-h-full">
              <Image
                src="/images/OIP (1).webp"
                alt="Styliste en train de travailler sur des patrons dans un atelier clair."
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 34vw"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-5 pb-5 pt-14 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                Commande directe
              </p>
              <p className="mt-2 text-sm text-white/76">
                Une seule page pour demander un modele, verifier un delai et
                lancer une production.
              </p>
            </div>
          </div>
        </div>
      </PageHero>
      <section className="container-luxe py-6 md:py-8">
        <div className="grid gap-3 rounded-[2rem] border border-border/60 bg-[linear-gradient(135deg,rgba(14,14,14,0.98),rgba(38,31,24,0.96)_58%,rgba(14,14,14,0.98))] p-6 text-white shadow-[0_30px_120px_rgba(0,0,0,0.18)] sm:grid-cols-3 sm:p-7">
          {contactSignals.map((item) => (
            <div
              key={item}
              className="rounded-[1.35rem] border border-white/10 bg-white/6 p-4 text-sm text-white/74"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <h2 className="text-4xl font-semibold">
              Envoyer une demande claire et complete
            </h2>
            <p className="mt-4 text-muted-foreground">
              Indiquez le modele voulu, la taille, la quantite et votre delai.
              Vous recevrez ensuite une reponse directe sur la disponibilite, la
              production ou la livraison.
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
              <li>
                Commande et demandes traitees par message, formulaire ou appel.
              </li>
              <li>
                Confirmation du modele, de la taille et du delai avant
                production.
              </li>
              <li>Production et vente sans accueil public a l&apos;atelier.</li>
              <li>Livraison ou retrait organises apres validation.</li>
            </ul>
            <div className="mt-8 rounded-[1.6rem] border border-border/60 bg-background/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Parcours de commande
              </p>
              <div className="mt-4 grid gap-3">
                {orderSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex gap-4 rounded-[1.25rem] border border-border/60 bg-card/70 p-4"
                  >
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </span>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

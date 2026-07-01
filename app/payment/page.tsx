import { Landmark, ShieldCheck, Smartphone, WalletCards } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { PaymentForm } from "@/features/payments/payment-form";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const paymentHighlights = [
  "Priorite aux paiements Mobile Money adaptes au Togo.",
  "Montants en FCFA avec creation de reference de paiement cote serveur.",
  "Parcours pret pour SEMOA CashPay avec validation stricte avant emission.",
];

const trustPoints = [
  {
    icon: Smartphone,
    title: "Mobile Money local",
    description:
      "TMoney et Flooz sont proposes comme canaux naturels pour accelerer l'encaissement au Togo.",
  },
  {
    icon: WalletCards,
    title: "API multi-methodes",
    description:
      "SEMOA annonce plus de 20 methodes de paiement via API, ce qui laisse un tunnel extensible au-dela du seul mobile money.",
  },
  {
    icon: ShieldCheck,
    title: "Couche de confiance",
    description:
      "Le parcours met en avant une reference unique, l'idempotence et une preparation pour le retour de paiement et le webhook.",
  },
  {
    icon: Landmark,
    title: "Ancrage local",
    description:
      "SEMOA est basee a Lome et opere sur plusieurs marches ouest-africains, ce qui colle au contexte d'INTEMPOREL.",
  },
];

export const metadata = buildMetadata({
  title: "Paiement | INTEMPOREL",
  description:
    "Reglez une commande INTEMPOREL via un tunnel de paiement moderne pense pour le Togo, en FCFA et priorite Mobile Money.",
  path: "/payment",
});

export default function PaymentPage() {
  return (
    <>
      <PageHero
        eyebrow="Paiement"
        title="Un paiement moderne, pense pour le Togo et branche sur SEMOA."
        description="Ce tunnel permet de regler un acompte ou une commande en FCFA, avec priorite Mobile Money, reference unique et preparation a l'encaissement via SEMOA CashPay."
      >
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div className="grid gap-3 rounded-[1.5rem] border border-border/60 bg-background/80 p-5 text-sm text-muted-foreground">
            <p>Base operationnelle: Lome, Togo</p>
            <p>Canaux prioritaires: TMoney, Flooz, carte bancaire</p>
            <p>Devise: FCFA (XOF)</p>
            <Link
              href="/collections"
              className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent"
            >
              Choisir une piece a regler
            </Link>
          </div>
          <div className="grid gap-3 rounded-[1.5rem] border border-border/60 bg-card/80 p-5 shadow-lg sm:grid-cols-3">
            {paymentHighlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-border/60 bg-background/75 p-4 text-sm text-muted-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="container-luxe py-6 md:py-8">
        <div className="grid gap-3 md:grid-cols-4">
          {trustPoints.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[1.6rem] border border-border/60 bg-card/80 p-5 shadow-sm"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-luxe py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <h2 className="text-4xl font-semibold">
              Generer un lien de paiement
            </h2>
            <p className="mt-4 text-muted-foreground">
              Le paiement est emis cote serveur avec une reference unique, un
              montant en FCFA, un numero Togo verifie et un choix clair entre
              mobile money, carte bancaire ou parcours mixte.
            </p>
            <div className="mt-8">
              <PaymentForm />
            </div>
          </div>

          <aside className="glass-panel rounded-[2rem] p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
              Lecture metier
            </p>
            <div className="mt-6 grid gap-4 text-muted-foreground">
              <p>
                Pour INTEMPOREL, le besoin prioritaire n&apos;est pas un panier
                massif mais un encaissement fiable d&apos;acomptes et de
                commandes sur mesure.
              </p>
              <p>
                Le tunnel propose donc un paiement direct, court, avec les
                canaux les plus credibles pour une cliente au Togo: Mobile Money
                d&apos;abord, puis carte si necessaire.
              </p>
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-border/60 bg-background/70 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Infos SEMOA retenues
              </p>
              <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
                <div className="rounded-[1.25rem] border border-border/60 bg-card/70 p-4">
                  +3M transactions traitees et plus de 20 methodes de paiement
                  via API.
                </div>
                <div className="rounded-[1.25rem] border border-border/60 bg-card/70 p-4">
                  Societe fondee a Lome, avec une promesse d&apos;API temps reel
                  et une presence regionale.
                </div>
                <div className="rounded-[1.25rem] border border-border/60 bg-card/70 p-4">
                  Communication axee securite, uptime et conformite, utile pour
                  un encaissement premium.
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[1.6rem] border border-border/60 bg-[linear-gradient(135deg,rgba(14,14,14,0.98),rgba(38,31,24,0.96)_58%,rgba(14,14,14,0.98))] p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
                Support commande
              </p>
              <p className="mt-3 text-sm text-white/76">
                Si une cliente prefere confirmer avant de regler, le parcours de
                commande reste disponible par telephone ou email.
              </p>
              <div className="mt-4 grid gap-2 text-sm text-white/76">
                <p>{siteConfig.contact.phone}</p>
                <p>{siteConfig.contact.email}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-luxe flex min-h-[75vh] items-center py-20">
      <div className="glass-panel-strong w-full rounded-[2.5rem] p-10 text-center sm:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          Erreur 404
        </p>
        <h1 className="mt-4 text-balance text-5xl font-semibold sm:text-6xl">
          {"Cette page n'est plus disponible."}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          {
            "La page recherchee est introuvable. Revenez a l'accueil, explorez la galerie ou contactez l'atelier pour une orientation rapide."
          }
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-accent"
          >
            {"Retour a l'accueil"}
          </Link>
          <Link
            href="/contact"
            className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border border-border/70 px-6 text-sm font-semibold transition hover:border-accent hover:text-accent"
          >
            {"Contacter l'atelier"}
          </Link>
        </div>
      </div>
    </section>
  );
}

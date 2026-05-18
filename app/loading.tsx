export default function Loading() {
  return (
    <div className="container-luxe flex min-h-[70vh] items-center justify-center py-24">
      <div className="glass-panel-strong w-full max-w-lg rounded-[2rem] p-10 text-center">
        <div className="mx-auto mb-6 h-16 w-16 animate-pulse rounded-full border border-accent/40 bg-accent/10" />
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
          INTEMPOREL
        </p>
        <h1 className="mt-4 font-heading text-4xl">
          {"Chargement du catalogue"}
        </h1>
        <div className="mt-6 grid gap-3">
          <div className="h-3 rounded-full bg-muted/80" />
          <div className="h-3 rounded-full bg-muted/60" />
          <div className="mx-auto h-3 w-2/3 rounded-full bg-muted/50" />
        </div>
      </div>
    </div>
  );
}

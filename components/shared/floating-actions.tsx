import { Mail, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-30 hidden gap-3 md:flex md:flex-col md:items-end">
      <a
        href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
        aria-label="Nous appeler"
        className="focus-ring inline-flex min-h-12 items-center gap-3 rounded-full border border-border/70 bg-card/90 px-5 py-3 text-sm font-medium shadow-lg transition hover:border-accent hover:text-accent"
      >
        <Phone className="size-4" />
        {"Nous appeler"}
      </a>
      <a
        href={`mailto:${siteConfig.contact.email}`}
        aria-label="Envoyer un email"
        className="focus-ring inline-flex min-h-12 items-center gap-3 rounded-full border border-border/70 bg-card/90 px-5 py-3 text-sm font-medium shadow-lg transition hover:border-accent hover:text-accent"
      >
        <Mail className="size-4" />
        {"Passer une commande"}
      </a>
    </div>
  );
}

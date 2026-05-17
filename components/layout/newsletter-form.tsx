"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
        setEmail("");
      }}
    >
      <label
        className="block text-sm font-medium text-muted-foreground"
        htmlFor="newsletter-email"
      >
        Newsletter privee
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Votre adresse email"
          required
          aria-label="Votre adresse email pour la newsletter"
          className="focus-ring min-h-12 flex-1 rounded-full border border-border/70 bg-background px-5"
        />
        <button
          type="submit"
          className="focus-ring min-h-12 rounded-full bg-primary px-6 text-primary-foreground transition hover:bg-accent"
        >
          Recevoir les editions
        </button>
      </div>
      <p className="text-sm text-muted-foreground" role="status">
        {submitted
          ? "Inscription prise en compte. Vous recevrez les prochaines editions confidentielles."
          : "Actualites couture, capsules et ouvertures d'agenda. Sans sur-sollicitation."}
      </p>
    </form>
  );
}

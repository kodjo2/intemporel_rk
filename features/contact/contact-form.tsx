"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Indiquez votre nom complet."),
  email: z.string().email("Indiquez une adresse email valide."),
  service: z.string().min(1, "Selectionnez un service."),
  occasion: z.string().min(2, "Precisez le contexte de votre demande."),
  message: z.string().min(20, "Ajoutez davantage de contexte a votre demande."),
  website: z.string().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

const defaultValues: ContactValues = {
  name: "",
  email: "",
  service: "",
  occasion: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [status, setStatus] = useState<string>("");
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { message: string };
    setStatus(payload.message);

    if (response.ok) {
      form.reset(defaultValues);
    }
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Nom complet
          <input
            aria-invalid={Boolean(form.formState.errors.name)}
            className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
            {...form.register("name")}
          />
          <span className="text-sm text-destructive">
            {form.formState.errors.name?.message}
          </span>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Email
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(form.formState.errors.email)}
            className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
            {...form.register("email")}
          />
          <span className="text-sm text-destructive">
            {form.formState.errors.email?.message}
          </span>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Service souhaite
          <select
            aria-invalid={Boolean(form.formState.errors.service)}
            className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
            {...form.register("service")}
          >
            <option value="">Choisir</option>
            <option value="couture">Production sur mesure</option>
            <option value="bridal">Vente de pieces disponibles</option>
            <option value="capsule">Series limitees</option>
            <option value="consulting">Commande a distance</option>
          </select>
          <span className="text-sm text-destructive">
            {form.formState.errors.service?.message}
          </span>
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Occasion ou temporalite
          <input
            aria-invalid={Boolean(form.formState.errors.occasion)}
            placeholder="Modele souhaite, quantite, delai..."
            className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
            {...form.register("occasion")}
          />
          <span className="text-sm text-destructive">
            {form.formState.errors.occasion?.message}
          </span>
        </label>
      </div>

      <label className="hidden" aria-hidden="true">
        Site web
        <input tabIndex={-1} autoComplete="off" {...form.register("website")} />
      </label>

      <label className="grid gap-2 text-sm font-medium">
        Votre message
        <textarea
          rows={7}
          aria-invalid={Boolean(form.formState.errors.message)}
          className="focus-ring rounded-[1.25rem] border border-border/70 bg-background px-4 py-3"
          placeholder="Parlez-nous du modele souhaite, de la taille, de la quantite et du delai vise."
          {...form.register("message")}
        />
        <span className="text-sm text-destructive">
          {form.formState.errors.message?.message}
        </span>
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm text-muted-foreground" role="status">
          {status ||
            "Les demandes sont traitees sous 24 heures ouvrables. Vous recevrez une reponse sur la disponibilite, la production ou la livraison."}
        </p>
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Envoi...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Envoyer la demande
            </>
          )}
        </button>
      </div>
    </form>
  );
}

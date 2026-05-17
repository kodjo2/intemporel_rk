"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(2, "Indiquez votre nom."),
  email: z.string().email("Indiquez une adresse email valide."),
  role: z.string().min(2, "Precisez votre role ou contexte."),
  quote: z.string().min(20, "Ajoutez un temoignage un peu plus detaille."),
  website: z.string().optional(),
});

type TestimonialValues = z.infer<typeof testimonialSchema>;

const defaultValues: TestimonialValues = {
  name: "",
  email: "",
  role: "",
  quote: "",
  website: "",
};

export function TestimonialForm() {
  const [status, setStatus] = useState("");
  const form = useForm<TestimonialValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("");

    const response = await fetch("/api/testimonials", {
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
    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-white/88">
          Nom
          <input
            aria-invalid={Boolean(form.formState.errors.name)}
            className="focus-ring min-h-11 rounded-[1rem] border border-white/12 bg-white/7 px-4 text-white placeholder:text-white/35"
            placeholder="Votre nom"
            {...form.register("name")}
          />
          {form.formState.errors.name?.message ? (
            <span className="text-sm text-amber-200">
              {form.formState.errors.name.message}
            </span>
          ) : null}
        </label>

        <label className="grid gap-2 text-sm font-medium text-white/88">
          Role ou contexte
          <input
            aria-invalid={Boolean(form.formState.errors.role)}
            className="focus-ring min-h-11 rounded-[1rem] border border-white/12 bg-white/7 px-4 text-white placeholder:text-white/35"
            placeholder="Cliente, fondatrice, direction image..."
            {...form.register("role")}
          />
          {form.formState.errors.role?.message ? (
            <span className="text-sm text-amber-200">
              {form.formState.errors.role.message}
            </span>
          ) : null}
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-white/88">
        Email
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(form.formState.errors.email)}
          className="focus-ring min-h-11 rounded-[1rem] border border-white/12 bg-white/7 px-4 text-white placeholder:text-white/35"
          placeholder="vous@email.com"
          {...form.register("email")}
        />
        {form.formState.errors.email?.message ? (
          <span className="text-sm text-amber-200">
            {form.formState.errors.email.message}
          </span>
        ) : null}
      </label>

      <label className="hidden" aria-hidden="true">
        Site web
        <input tabIndex={-1} autoComplete="off" {...form.register("website")} />
      </label>

      <label className="grid gap-2 text-sm font-medium text-white/88">
        Votre temoignage
        <textarea
          rows={5}
          aria-invalid={Boolean(form.formState.errors.quote)}
          className="focus-ring rounded-[1rem] border border-white/12 bg-white/7 px-4 py-3 text-white placeholder:text-white/35"
          placeholder="Partagez en quelques lignes votre experience avec INTEMPOREL."
          {...form.register("quote")}
        />
        {form.formState.errors.quote?.message ? (
          <span className="text-sm text-amber-200">
            {form.formState.errors.quote.message}
          </span>
        ) : null}
      </label>

      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>

      <div className="flex justify-start">
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f4d28b] px-5 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-52"
        >
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              Envoi...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Envoyer mon temoignage
            </>
          )}
        </button>
      </div>
    </form>
  );
}

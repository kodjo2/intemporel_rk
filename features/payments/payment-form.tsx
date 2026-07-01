"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LoaderCircle, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import {
  getMethodLabel,
  getProviderLabel,
  paymentSchema,
  type PaymentInput,
  type PaymentValues,
} from "@/lib/payment";

type PaymentRecordResponse = {
  reference: string;
  paymentStatus: "pending" | "paid" | "failed" | "cancelled" | "unknown";
  gatewayStatus: string;
  updatedAt: string;
  lastWebhookAt: string | null;
  message?: string;
};

type PaymentResponse = {
  message: string;
  reference?: string;
  checkoutUrl?: string | null;
  amount?: number;
  currency?: string;
  gateway?: string;
  status?: string;
};

const defaultValues: PaymentValues = {
  name: "",
  email: "",
  phone: "+228",
  collection: "",
  amount: 120000,
  paymentMethod: "mobile_money",
  provider: "auto",
  notes: "",
  website: "",
};

export function PaymentForm() {
  const [status, setStatus] = useState(
    "Paiement en FCFA via SEMOA, avec priorite Mobile Money pour le Togo.",
  );
  const [paymentResult, setPaymentResult] = useState<PaymentResponse | null>(
    null,
  );
  const [recordStatus, setRecordStatus] =
    useState<PaymentRecordResponse | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const form = useForm<PaymentInput, unknown, PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  const selectedMethod = useWatch({
    control: form.control,
    name: "paymentMethod",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("Creation du paiement en cours...");
    setPaymentResult(null);
    setRecordStatus(null);

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as PaymentResponse;
    setStatus(payload.message);
    setPaymentResult(payload);

    if (response.ok) {
      form.reset({ ...defaultValues, amount: values.amount });
    }
  });

  async function checkPaymentStatus(reference: string) {
    setIsCheckingStatus(true);

    try {
      const response = await fetch(`/api/payment/${reference}`, {
        method: "GET",
        cache: "no-store",
      });

      const payload = (await response.json()) as PaymentRecordResponse;

      if (!response.ok) {
        setStatus(payload.message ?? "Le statut du paiement est introuvable.");
        return;
      }

      setRecordStatus(payload);
      setStatus(
        payload.paymentStatus === "paid"
          ? "Paiement confirme. La commande peut etre traitee comme reglee."
          : "Le statut local a ete actualise a partir de la derniere confirmation recue.",
      );
    } finally {
      setIsCheckingStatus(false);
    }
  }

  function renderPaymentStatusLabel(
    statusValue: PaymentRecordResponse["paymentStatus"],
  ) {
    switch (statusValue) {
      case "paid":
        return "Regle";
      case "failed":
        return "Echoue";
      case "cancelled":
        return "Annule";
      case "pending":
        return "En attente";
      default:
        return "Inconnu";
    }
  }

  const providerOptions =
    selectedMethod === "bank_card"
      ? [{ value: "card", label: "Carte bancaire" }]
      : [
          { value: "auto", label: "Attribution automatique" },
          { value: "tmoney", label: "TMoney" },
          { value: "flooz", label: "Flooz" },
          ...(selectedMethod === "mixed"
            ? [{ value: "card", label: "Carte bancaire" }]
            : []),
        ];

  return (
    <div className="space-y-6">
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Nom du payeur
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
            Telephone Togo
            <input
              inputMode="tel"
              autoComplete="tel"
              placeholder="+228 70 00 00 00"
              aria-invalid={Boolean(form.formState.errors.phone)}
              className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
              {...form.register("phone")}
            />
            <span className="text-sm text-destructive">
              {form.formState.errors.phone?.message}
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Piece ou collection
            <input
              placeholder="Ex: Capsule ivoire, acompte robe sur mesure"
              aria-invalid={Boolean(form.formState.errors.collection)}
              className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
              {...form.register("collection")}
            />
            <span className="text-sm text-destructive">
              {form.formState.errors.collection?.message}
            </span>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium sm:col-span-1">
            Montant
            <input
              type="number"
              min={5000}
              step={1000}
              inputMode="numeric"
              aria-invalid={Boolean(form.formState.errors.amount)}
              className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
              {...form.register("amount", { valueAsNumber: true })}
            />
            <span className="text-sm text-destructive">
              {form.formState.errors.amount?.message}
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium sm:col-span-1">
            Mode de paiement
            <select
              aria-invalid={Boolean(form.formState.errors.paymentMethod)}
              className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
              {...form.register("paymentMethod", {
                onChange: (event) => {
                  if (event.target.value === "bank_card") {
                    form.setValue("provider", "card");
                    return;
                  }

                  if (form.getValues("provider") === "card") {
                    form.setValue("provider", "auto");
                  }
                },
              })}
            >
              <option value="mobile_money">Mobile Money</option>
              <option value="mixed">Multi-canal</option>
              <option value="bank_card">Carte bancaire</option>
            </select>
            <span className="text-sm text-destructive">
              {form.formState.errors.paymentMethod?.message}
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium sm:col-span-1">
            Canal prefere
            <select
              aria-invalid={Boolean(form.formState.errors.provider)}
              className="focus-ring min-h-12 rounded-[1.25rem] border border-border/70 bg-background px-4"
              {...form.register("provider")}
            >
              {providerOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="text-sm text-destructive">
              {form.formState.errors.provider?.message}
            </span>
          </label>
        </div>

        <label className="hidden" aria-hidden="true">
          Site web
          <input
            tabIndex={-1}
            autoComplete="off"
            {...form.register("website")}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium">
          Notes complementaires
          <textarea
            rows={5}
            aria-invalid={Boolean(form.formState.errors.notes)}
            className="focus-ring rounded-[1.25rem] border border-border/70 bg-background px-4 py-3"
            placeholder="Taille, acompte, date de livraison, precision sur la commande..."
            {...form.register("notes")}
          />
          <span className="text-sm text-destructive">
            {form.formState.errors.notes?.message}
          </span>
        </label>

        <div className="flex flex-col gap-4 rounded-[1.5rem] border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p role="status" className="max-w-2xl">
            {status}
          </p>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" />
                Connexion...
              </>
            ) : (
              <>
                <Wallet className="size-4" />
                Generer le paiement
              </>
            )}
          </button>
        </div>
      </form>

      {paymentResult ? (
        <div className="grid gap-4 rounded-[1.7rem] border border-border/60 bg-[linear-gradient(135deg,rgba(14,14,14,0.98),rgba(38,31,24,0.96)_58%,rgba(14,14,14,0.98))] p-5 text-white shadow-[0_24px_90px_rgba(0,0,0,0.16)] sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
              Paiement pret
            </p>
            <p className="text-2xl font-semibold">
              {paymentResult.amount
                ? `${paymentResult.amount.toLocaleString("fr-FR")} ${paymentResult.currency ?? "FCFA"}`
                : "Creation de lien de paiement"}
            </p>
            <div className="grid gap-2 text-sm text-white/74">
              {paymentResult.reference ? (
                <p>Reference: {paymentResult.reference}</p>
              ) : null}
              <p>
                Canal: {getMethodLabel(form.getValues("paymentMethod"))} -{" "}
                {getProviderLabel(form.getValues("provider"))}
              </p>
              <p>Passerelle: {paymentResult.gateway ?? "SEMOA"}</p>
            </div>
          </div>

          {paymentResult.checkoutUrl ? (
            <div className="flex flex-col gap-3 sm:items-end">
              <Link
                href={paymentResult.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f4d28b] px-6 text-sm font-semibold text-[#1b1610] transition hover:bg-[#e8c373]"
              >
                Finaliser le paiement
                <ArrowRight className="size-4" />
              </Link>
              {paymentResult.reference ? (
                <button
                  type="button"
                  onClick={() => checkPaymentStatus(paymentResult.reference!)}
                  disabled={isCheckingStatus}
                  className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm text-white/76 transition hover:border-[#f4d28b] hover:text-[#f4d28b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCheckingStatus ? "Verification..." : "Verifier le statut"}
                </button>
              ) : null}
            </div>
          ) : (
            <div className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-sm text-white/72">
              <ShieldCheck className="size-4" />
              Activation SEMOA requise
            </div>
          )}
        </div>
      ) : null}

      {recordStatus ? (
        <div className="rounded-[1.5rem] border border-border/60 bg-background/80 p-5 text-sm text-muted-foreground shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Statut enregistre
            </p>
            <p className="rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              {renderPaymentStatusLabel(recordStatus.paymentStatus)}
            </p>
          </div>
          <div className="mt-4 grid gap-2">
            <p>Reference: {recordStatus.reference}</p>
            <p>Statut passerelle: {recordStatus.gatewayStatus}</p>
            <p>
              Mis a jour:{" "}
              {new Date(recordStatus.updatedAt).toLocaleString("fr-FR")}
            </p>
            <p>
              Dernier webhook:{" "}
              {recordStatus.lastWebhookAt
                ? new Date(recordStatus.lastWebhookAt).toLocaleString("fr-FR")
                : "Aucune confirmation webhook recue"}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

import { z } from "zod";

export const paymentMethodValues = [
  "mobile_money",
  "bank_card",
  "mixed",
] as const;

export const paymentProviderValues = [
  "auto",
  "tmoney",
  "flooz",
  "card",
] as const;

export const paymentSchema = z.object({
  name: z.string().trim().min(2, "Indiquez le nom du payeur."),
  email: z.string().trim().email("Indiquez une adresse email valide."),
  phone: z
    .string()
    .trim()
    .min(8, "Indiquez un numero de telephone joignable.")
    .transform(normalizeTogoPhoneNumber)
    .refine(isValidTogoPhoneNumber, "Utilisez un numero Togo valide."),
  collection: z.string().trim().min(2, "Precisez la collection ou la piece."),
  amount: z.coerce
    .number()
    .refine((value) => Number.isFinite(value), "Indiquez un montant.")
    .int("Le montant doit etre un nombre entier.")
    .min(5000, "Le montant minimum est de 5 000 FCFA.")
    .max(5000000, "Le montant maximum est de 5 000 000 FCFA."),
  paymentMethod: z.enum(paymentMethodValues, {
    message: "Choisissez un mode de paiement.",
  }),
  provider: z.enum(paymentProviderValues, {
    message: "Choisissez un canal de paiement.",
  }),
  notes: z
    .string()
    .trim()
    .max(500, "Raccourcissez les details complementaires.")
    .optional()
    .or(z.literal("")),
  website: z.string().optional(),
});

export type PaymentInput = z.input<typeof paymentSchema>;
export type PaymentValues = z.infer<typeof paymentSchema>;

export function normalizeTogoPhoneNumber(input: string) {
  const digits = input.replace(/\D/g, "");

  if (digits.startsWith("228") && digits.length === 11) {
    return `+${digits}`;
  }

  if (digits.length === 8) {
    return `+228${digits}`;
  }

  return input.trim();
}

export function isValidTogoPhoneNumber(input: string) {
  return /^\+228\d{8}$/.test(input);
}

export function buildPaymentReference() {
  const time = Date.now().toString(36).toUpperCase();
  const nonce = crypto.randomUUID().slice(0, 8).toUpperCase();

  return `INT-${time}-${nonce}`;
}

export function getPaymentConfig() {
  return {
    apiUrl: process.env.SEMOA_API_URL,
    apiKey: process.env.SEMOA_API_KEY,
    merchantCode: process.env.SEMOA_MERCHANT_CODE,
    returnUrl: process.env.SEMOA_RETURN_URL ?? process.env.NEXT_PUBLIC_SITE_URL,
    webhookUrl: process.env.SEMOA_WEBHOOK_URL,
    apiHeadersJson: process.env.SEMOA_API_HEADERS_JSON,
    requestTemplate: process.env.SEMOA_REQUEST_TEMPLATE,
    checkoutUrlPath: process.env.SEMOA_CHECKOUT_URL_PATH,
    messagePath: process.env.SEMOA_MESSAGE_PATH,
    statusPath: process.env.SEMOA_STATUS_PATH,
    webhookSecret: process.env.SEMOA_WEBHOOK_SECRET,
    webhookSignatureHeader:
      process.env.SEMOA_WEBHOOK_SIGNATURE_HEADER ?? "x-semoa-signature",
    webhookReferencePath: process.env.SEMOA_WEBHOOK_REFERENCE_PATH,
    webhookStatusPath: process.env.SEMOA_WEBHOOK_STATUS_PATH,
    webhookAmountPath: process.env.SEMOA_WEBHOOK_AMOUNT_PATH,
    webhookProviderPath: process.env.SEMOA_WEBHOOK_PROVIDER_PATH,
  };
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getNestedValue(
  payload: unknown,
  path: string | undefined,
): unknown {
  if (!path) {
    return undefined;
  }

  return path.split(".").reduce<unknown>((current, key) => {
    if (!isRecord(current)) {
      return undefined;
    }

    return current[key];
  }, payload);
}

export function parseJsonEnv(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

type TemplateContext = Record<string, string | number | undefined | null>;

function replaceTemplateTokens(value: string, context: TemplateContext) {
  return value.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, token: string) => {
    const resolved = context[token];
    return resolved === undefined || resolved === null ? "" : String(resolved);
  });
}

export function applyTemplate(
  template: unknown,
  context: TemplateContext,
): unknown {
  if (typeof template === "string") {
    return replaceTemplateTokens(template, context);
  }

  if (Array.isArray(template)) {
    return template.map((item) => applyTemplate(item, context));
  }

  if (isRecord(template)) {
    return Object.fromEntries(
      Object.entries(template).map(([key, value]) => [
        key,
        applyTemplate(value, context),
      ]),
    );
  }

  return template;
}

export function buildPaymentTemplateContext(
  values: PaymentValues,
  reference: string,
  config: ReturnType<typeof getPaymentConfig>,
) {
  return {
    reference,
    amount: values.amount,
    currency: "XOF",
    country: "TG",
    locale: "fr-TG",
    name: values.name,
    email: values.email,
    phone: values.phone,
    collection: values.collection,
    notes: values.notes,
    paymentMethod: values.paymentMethod,
    provider: values.provider,
    description: `Paiement INTEMPOREL - ${values.collection}`,
    merchantCode: config.merchantCode,
    returnUrl: config.returnUrl,
    callbackUrl: config.returnUrl,
    webhookUrl: config.webhookUrl,
  } satisfies TemplateContext;
}

export function getProviderLabel(provider: PaymentValues["provider"]) {
  switch (provider) {
    case "tmoney":
      return "TMoney";
    case "flooz":
      return "Flooz";
    case "card":
      return "Carte bancaire";
    default:
      return "Attribution automatique";
  }
}

export function getMethodLabel(method: PaymentValues["paymentMethod"]) {
  switch (method) {
    case "mobile_money":
      return "Mobile Money";
    case "bank_card":
      return "Carte bancaire";
    default:
      return "Multi-canal";
  }
}

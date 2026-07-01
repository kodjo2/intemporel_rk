import { NextResponse } from "next/server";

import {
  applyTemplate,
  buildPaymentReference,
  buildPaymentTemplateContext,
  getNestedValue,
  getMethodLabel,
  getPaymentConfig,
  getProviderLabel,
  isRecord,
  parseJsonEnv,
  type PaymentValues,
  paymentSchema,
} from "@/lib/payment";
import {
  normalizeLifecycleStatus,
  upsertPaymentRecord,
} from "@/lib/payment-store";

export const runtime = "nodejs";

type GatewayPayload = Record<string, unknown>;

function parseJsonSafely(value: string) {
  try {
    return JSON.parse(value) as GatewayPayload;
  } catch {
    return null;
  }
}

function extractCheckoutUrl(payload: GatewayPayload | null) {
  if (!payload) {
    return null;
  }

  const nested = (payload.data ?? payload.payment ?? payload.checkout) as
    | GatewayPayload
    | undefined;

  return (
    (typeof payload.checkoutUrl === "string" && payload.checkoutUrl) ||
    (typeof payload.paymentUrl === "string" && payload.paymentUrl) ||
    (typeof payload.redirect_url === "string" && payload.redirect_url) ||
    (typeof payload.url === "string" && payload.url) ||
    (nested && typeof nested.checkoutUrl === "string" && nested.checkoutUrl) ||
    (nested && typeof nested.paymentUrl === "string" && nested.paymentUrl) ||
    (nested && typeof nested.url === "string" && nested.url) ||
    null
  );
}

function extractGatewayMessage(payload: GatewayPayload | null) {
  if (!payload) {
    return null;
  }

  const nested = (payload.data ?? payload.payment ?? payload.checkout) as
    | GatewayPayload
    | undefined;

  return (
    (typeof payload.message === "string" && payload.message) ||
    (typeof payload.detail === "string" && payload.detail) ||
    (nested && typeof nested.message === "string" && nested.message) ||
    null
  );
}

function buildDefaultPayload(
  reference: string,
  config: ReturnType<typeof getPaymentConfig>,
  values: PaymentValues,
) {
  return {
    reference,
    merchantCode: config.merchantCode,
    amount: values.amount,
    currency: "XOF",
    country: "TG",
    locale: "fr-TG",
    paymentMethod: values.paymentMethod,
    provider: values.provider,
    description: `Paiement INTEMPOREL - ${values.collection}`,
    customer: {
      name: values.name,
      email: values.email,
      phone: values.phone,
    },
    metadata: {
      brand: "INTEMPOREL",
      collection: values.collection,
      notes: values.notes,
      paymentMethodLabel: getMethodLabel(values.paymentMethod as never),
      providerLabel: getProviderLabel(values.provider as never),
    },
    callbackUrl: config.returnUrl,
    returnUrl: config.returnUrl,
    webhookUrl: config.webhookUrl,
  };
}

function buildGatewayPayload(
  reference: string,
  config: ReturnType<typeof getPaymentConfig>,
  values: PaymentValues,
) {
  const parsedTemplate = parseJsonEnv(config.requestTemplate);

  if (parsedTemplate) {
    return applyTemplate(
      parsedTemplate,
      buildPaymentTemplateContext(values, reference, config),
    );
  }

  return buildDefaultPayload(reference, config, values);
}

function buildGatewayHeaders(
  config: ReturnType<typeof getPaymentConfig>,
  reference: string,
) {
  const headers = new Headers({
    Authorization: `Bearer ${config.apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": config.apiKey ?? "",
    "Idempotency-Key": reference,
  });

  const extraHeaders = parseJsonEnv(config.apiHeadersJson);

  if (isRecord(extraHeaders)) {
    for (const [key, value] of Object.entries(extraHeaders)) {
      if (typeof value === "string") {
        headers.set(key, value);
      }
    }
  }

  return headers;
}

function extractStringValue(payload: GatewayPayload | null, path?: string) {
  const configuredValue = getNestedValue(payload, path);
  return typeof configuredValue === "string" ? configuredValue : null;
}

export async function POST(request: Request) {
  const body = (await request.json()) as unknown;
  const result = paymentSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        message:
          "Merci de verifier les informations de paiement avant de continuer.",
      },
      { status: 400 },
    );
  }

  if (result.data.website) {
    return NextResponse.json({ message: "Paiement en attente." });
  }

  const config = getPaymentConfig();

  if (!config.apiUrl || !config.apiKey) {
    return NextResponse.json(
      {
        message:
          "Le tunnel de paiement est pret, mais la connexion SEMOA n'est pas encore active. Ajoutez SEMOA_API_URL et SEMOA_API_KEY dans l'environnement.",
      },
      { status: 503 },
    );
  }

  const reference = buildPaymentReference();
  const payload = buildGatewayPayload(reference, config, result.data);

  try {
    const gatewayResponse = await fetch(config.apiUrl, {
      method: "POST",
      headers: buildGatewayHeaders(config, reference),
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const rawResponse = await gatewayResponse.text();
    const parsed = parseJsonSafely(rawResponse);
    const checkoutUrl =
      extractStringValue(parsed, config.checkoutUrlPath) ??
      extractCheckoutUrl(parsed);
    const gatewayMessage =
      extractStringValue(parsed, config.messagePath) ??
      extractGatewayMessage(parsed);
    const gatewayStatus =
      extractStringValue(parsed, config.statusPath) ??
      ((parsed && typeof parsed.status === "string" && parsed.status) ||
        "pending");

    if (!gatewayResponse.ok) {
      return NextResponse.json(
        {
          message:
            gatewayMessage ??
            "SEMOA a refuse la creation du paiement pour le moment.",
          reference,
        },
        { status: 502 },
      );
    }

    await upsertPaymentRecord(reference, {
      gateway: "SEMOA CashPay",
      amount: result.data.amount,
      currency: "XOF",
      collection: result.data.collection,
      customerName: result.data.name,
      customerEmail: result.data.email,
      customerPhone: result.data.phone,
      paymentMethod: result.data.paymentMethod,
      provider: result.data.provider,
      checkoutUrl,
      gatewayStatus: gatewayStatus,
      paymentStatus: normalizeLifecycleStatus(gatewayStatus),
      lastEvent: "payment_created",
    });

    return NextResponse.json({
      message: checkoutUrl
        ? "Le lien de paiement a ete genere. Vous pouvez finaliser le reglement maintenant."
        : "La demande de paiement a ete creee et transmise a SEMOA.",
      reference,
      amount: result.data.amount,
      currency: "XOF",
      checkoutUrl,
      gateway: "SEMOA CashPay",
      status: gatewayStatus,
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "La connexion au prestataire de paiement est indisponible pour le moment. Reessayez dans quelques instants.",
        reference,
      },
      { status: 502 },
    );
  }
}

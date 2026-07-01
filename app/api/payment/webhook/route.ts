import { NextResponse } from "next/server";

import { getNestedValue, getPaymentConfig, isRecord } from "@/lib/payment";
import {
  normalizeLifecycleStatus,
  upsertPaymentRecord,
} from "@/lib/payment-store";

export const runtime = "nodejs";

type WebhookPayload = Record<string, unknown>;

function extractString(payload: WebhookPayload, ...paths: string[]) {
  for (const path of paths) {
    const value = getNestedValue(payload, path);

    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

function extractNumber(payload: WebhookPayload, ...paths: string[]) {
  for (const path of paths) {
    const value = getNestedValue(payload, path);

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function isAuthorized(
  request: Request,
  config: ReturnType<typeof getPaymentConfig>,
) {
  if (!config.webhookSecret) {
    return true;
  }

  const authorization = request.headers.get("authorization");
  if (authorization === `Bearer ${config.webhookSecret}`) {
    return true;
  }

  const signature = request.headers.get(config.webhookSignatureHeader);
  return signature === config.webhookSecret;
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "payment-webhook",
  });
}

export async function POST(request: Request) {
  const config = getPaymentConfig();

  if (!isAuthorized(request, config)) {
    return NextResponse.json(
      { message: "Webhook non autorise." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as unknown;

  if (!isRecord(body)) {
    return NextResponse.json(
      { message: "Payload webhook invalide." },
      { status: 400 },
    );
  }

  const payload = body as WebhookPayload;
  const reference =
    extractString(
      payload,
      config.webhookReferencePath ?? "reference",
      "transaction.reference",
      "payment.reference",
      "data.reference",
      "data.transaction.reference",
    ) ?? "unknown";
  const status =
    extractString(
      payload,
      config.webhookStatusPath ?? "status",
      "transaction.status",
      "payment.status",
      "data.status",
      "data.transaction.status",
    ) ?? "received";
  const provider = extractString(
    payload,
    config.webhookProviderPath ?? "provider",
    "transaction.provider",
    "payment.provider",
    "data.provider",
  );
  const amount = extractNumber(
    payload,
    config.webhookAmountPath ?? "amount",
    "transaction.amount",
    "payment.amount",
    "data.amount",
  );

  console.info("SEMOA webhook received", {
    reference,
    status,
    provider,
    amount,
    event: extractString(payload, "event", "type", "data.event"),
  });

  await upsertPaymentRecord(reference, {
    gateway: "SEMOA CashPay",
    amount: amount ?? undefined,
    provider: provider ?? undefined,
    gatewayStatus: status,
    paymentStatus: normalizeLifecycleStatus(status),
    lastWebhookAt: new Date().toISOString(),
    lastEvent: extractString(payload, "event", "type", "data.event"),
  });

  return NextResponse.json(
    {
      received: true,
      reference,
      status,
    },
    { status: 202 },
  );
}

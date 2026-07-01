import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type PaymentLifecycleStatus =
  | "pending"
  | "paid"
  | "failed"
  | "cancelled"
  | "unknown";

export type PaymentRecord = {
  reference: string;
  amount: number;
  currency: string;
  collection: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: string;
  provider: string;
  gateway: string;
  checkoutUrl: string | null;
  gatewayStatus: string;
  paymentStatus: PaymentLifecycleStatus;
  createdAt: string;
  updatedAt: string;
  lastWebhookAt: string | null;
  lastEvent: string | null;
};

type PaymentStore = {
  records: Record<string, PaymentRecord>;
};

const DEFAULT_STORE: PaymentStore = {
  records: {},
};

function getStoreFilePath() {
  return (
    process.env.PAYMENT_STORE_FILE ??
    path.join(process.cwd(), ".data", "payment-records.json")
  );
}

async function ensureStoreDirectory() {
  const filePath = getStoreFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  return filePath;
}

async function readStore() {
  const filePath = await ensureStoreDirectory();

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as PaymentStore;

    if (!parsed || typeof parsed !== "object" || !("records" in parsed)) {
      return DEFAULT_STORE;
    }

    return parsed;
  } catch {
    return DEFAULT_STORE;
  }
}

async function writeStore(store: PaymentStore) {
  const filePath = await ensureStoreDirectory();
  await writeFile(filePath, JSON.stringify(store, null, 2), "utf8");
}

export function normalizeLifecycleStatus(status: string | null | undefined) {
  const normalized = status?.trim().toLowerCase();

  if (!normalized) {
    return "unknown" satisfies PaymentLifecycleStatus;
  }

  if (
    ["success", "successful", "succeeded", "paid", "completed"].includes(
      normalized,
    )
  ) {
    return "paid" satisfies PaymentLifecycleStatus;
  }

  if (["pending", "processing", "initiated", "created"].includes(normalized)) {
    return "pending" satisfies PaymentLifecycleStatus;
  }

  if (["failed", "error", "declined", "rejected"].includes(normalized)) {
    return "failed" satisfies PaymentLifecycleStatus;
  }

  if (["cancelled", "canceled", "expired"].includes(normalized)) {
    return "cancelled" satisfies PaymentLifecycleStatus;
  }

  return "unknown" satisfies PaymentLifecycleStatus;
}

export async function savePaymentRecord(record: PaymentRecord) {
  const store = await readStore();
  store.records[record.reference] = record;
  await writeStore(store);
  return record;
}

export async function getPaymentRecord(reference: string) {
  const store = await readStore();
  return store.records[reference] ?? null;
}

export async function upsertPaymentRecord(
  reference: string,
  update: Partial<PaymentRecord> & Pick<PaymentRecord, "gateway">,
) {
  const store = await readStore();
  const existing = store.records[reference];
  const timestamp = new Date().toISOString();

  const nextRecord: PaymentRecord = {
    reference,
    amount: update.amount ?? existing?.amount ?? 0,
    currency: update.currency ?? existing?.currency ?? "XOF",
    collection: update.collection ?? existing?.collection ?? "",
    customerName: update.customerName ?? existing?.customerName ?? "",
    customerEmail: update.customerEmail ?? existing?.customerEmail ?? "",
    customerPhone: update.customerPhone ?? existing?.customerPhone ?? "",
    paymentMethod: update.paymentMethod ?? existing?.paymentMethod ?? "",
    provider: update.provider ?? existing?.provider ?? "",
    gateway: update.gateway,
    checkoutUrl:
      update.checkoutUrl !== undefined
        ? update.checkoutUrl
        : (existing?.checkoutUrl ?? null),
    gatewayStatus: update.gatewayStatus ?? existing?.gatewayStatus ?? "pending",
    paymentStatus: update.paymentStatus ?? existing?.paymentStatus ?? "pending",
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
    lastWebhookAt:
      update.lastWebhookAt !== undefined
        ? update.lastWebhookAt
        : (existing?.lastWebhookAt ?? null),
    lastEvent:
      update.lastEvent !== undefined
        ? update.lastEvent
        : (existing?.lastEvent ?? null),
  };

  store.records[reference] = nextRecord;
  await writeStore(store);
  return nextRecord;
}

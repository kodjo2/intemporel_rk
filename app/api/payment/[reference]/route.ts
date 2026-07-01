import { NextResponse } from "next/server";

import { getPaymentRecord } from "@/lib/payment-store";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ reference: string }> },
) {
  const { reference } = await context.params;
  const record = await getPaymentRecord(reference);

  if (!record) {
    return NextResponse.json(
      { message: "Paiement introuvable.", reference },
      { status: 404 },
    );
  }

  return NextResponse.json(record);
}

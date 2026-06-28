import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMpConfigured, getPayment } from "@/lib/mercadopago";

export const runtime = "nodejs";

/**
 * Webhook do Mercado Pago. Recebe a notificação, RE-CONSULTA o pagamento na API
 * do MP (fonte da verdade) e, se aprovado, marca a compra como paga. A baixa é
 * idempotente: só atualiza compras que ainda estão "pending".
 */
export async function POST(req: Request) {
  if (!isMpConfigured) {
    return NextResponse.json({ ok: true, skipped: "mp not configured" });
  }

  const url = new URL(req.url);
  let paymentId: string | null =
    url.searchParams.get("data.id") ?? url.searchParams.get("id");
  let topic =
    url.searchParams.get("type") ?? url.searchParams.get("topic") ?? "";

  try {
    const body = await req.json();
    topic = body?.type ?? body?.action ?? topic;
    paymentId = body?.data?.id ? String(body.data.id) : paymentId;
  } catch {
    // Algumas notificações vêm sem corpo (apenas query string) — tudo bem.
  }

  // Só nos interessam eventos de pagamento.
  if (!paymentId || !String(topic).includes("payment")) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    const payment = await getPayment(paymentId);
    const status = payment.status; // approved | pending | rejected | ...
    const purchaseId = payment.external_reference;

    if (!purchaseId) {
      return NextResponse.json({ ok: true, note: "sem external_reference" });
    }

    const supabase = createAdminClient();

    if (status === "approved") {
      const { error } = await supabase
        .from("purchases")
        .update({
          status: "paid",
          mp_payment_id: String(paymentId),
          paid_at: new Date().toISOString(),
        })
        .eq("id", purchaseId)
        .eq("status", "pending"); // idempotência
      if (error) console.error("webhook update paid:", error.message);
    } else if (status === "rejected" || status === "cancelled") {
      await supabase
        .from("purchases")
        .update({ status: "failed", mp_payment_id: String(paymentId) })
        .eq("id", purchaseId)
        .eq("status", "pending");
    }

    return NextResponse.json({ ok: true, status });
  } catch (err) {
    console.error("webhook error:", err);
    // Responder 200 evita reentregas infinitas para erros não recuperáveis,
    // mas devolvemos 500 para que o MP tente novamente em falhas transitórias.
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// O Mercado Pago às vezes faz um GET de validação na URL do webhook.
export async function GET() {
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMpConfigured, createPreference } from "@/lib/mercadopago";

export const runtime = "nodejs";

type Body = {
  giftId?: string;
  quantity?: number;
  buyerName?: string;
  buyerEmail?: string;
  message?: string | null;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const { giftId, buyerName, buyerEmail, message } = body;
  const quantity = Math.floor(Number(body.quantity ?? 0));

  if (!giftId || !buyerName?.trim() || !buyerEmail?.trim() || quantity < 1) {
    return NextResponse.json(
      { error: "Dados incompletos para o presente." },
      { status: 400 }
    );
  }

  // Modo demonstração: sem Supabase e/ou sem Mercado Pago configurados.
  if (!isSupabaseConfigured || !isMpConfigured) {
    return NextResponse.json({ demo: true });
  }

  const supabase = createAdminClient();

  // Busca o presente e a quantidade já vendida para validar disponibilidade.
  const { data: gift, error: giftErr } = await supabase
    .from("gifts_public")
    .select("id, title, cota_price, total_cotas, cotas_sold, active")
    .eq("id", giftId)
    .maybeSingle();

  if (giftErr || !gift || !gift.active) {
    return NextResponse.json(
      { error: "Presente não encontrado." },
      { status: 404 }
    );
  }

  const left = gift.total_cotas - (gift.cotas_sold ?? 0);
  if (quantity > left) {
    return NextResponse.json(
      { error: `Só restam ${left} cota(s) deste presente.` },
      { status: 409 }
    );
  }

  const amount = quantity * gift.cota_price;

  // Cria a compra como pendente.
  const { data: purchase, error: insertErr } = await supabase
    .from("purchases")
    .insert({
      gift_id: gift.id,
      buyer_name: buyerName.trim(),
      buyer_email: buyerEmail.trim(),
      message: message?.trim() || null,
      quantity,
      amount,
      status: "pending",
    })
    .select("id")
    .single();

  if (insertErr || !purchase) {
    console.error("checkout insert:", insertErr?.message);
    return NextResponse.json(
      { error: "Não foi possível registrar o presente." },
      { status: 500 }
    );
  }

  try {
    const { url, preferenceId } = await createPreference({
      purchaseId: purchase.id,
      title: gift.title,
      quantity,
      unitPriceCents: gift.cota_price,
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim(),
    });

    await supabase
      .from("purchases")
      .update({ mp_preference_id: preferenceId })
      .eq("id", purchase.id);

    return NextResponse.json({ url });
  } catch (err) {
    console.error("createPreference:", err);
    return NextResponse.json(
      { error: "Falha ao iniciar o pagamento no Mercado Pago." },
      { status: 502 }
    );
  }
}

import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMpConfigured, createPreference } from "@/lib/mercadopago";
import { VALOR_LIVRE_MAX_CENTS, formatBRL } from "@/lib/types";

export const runtime = "nodejs";

type Body = {
  giftId?: string;
  quantity?: number;
  /** Só para presentes de valor livre: quanto o convidado quer dar, em centavos. */
  amountCents?: number;
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
    .select("id, title, cota_price, total_cotas, cotas_sold, active, valor_livre")
    .eq("id", giftId)
    .maybeSingle();

  if (giftErr || !gift || !gift.active) {
    return NextResponse.json(
      { error: "Presente não encontrado." },
      { status: 404 }
    );
  }

  // O valor SEMPRE é decidido aqui no servidor. O valor vindo do navegador só
  // vale para presentes de valor livre, e mesmo assim dentro de limites.
  let finalQuantity = quantity;
  let unitPriceCents = gift.cota_price;

  if (gift.valor_livre) {
    const chosen = Math.round(Number(body.amountCents));
    if (
      !Number.isFinite(chosen) ||
      chosen < gift.cota_price ||
      chosen > VALOR_LIVRE_MAX_CENTS
    ) {
      return NextResponse.json(
        {
          error: `Escolha um valor entre ${formatBRL(gift.cota_price)} e ${formatBRL(VALOR_LIVRE_MAX_CENTS)}.`,
        },
        { status: 400 }
      );
    }
    finalQuantity = 1;
    unitPriceCents = chosen;
  } else {
    const left = gift.total_cotas - (gift.cotas_sold ?? 0);
    if (quantity > left) {
      return NextResponse.json(
        { error: `Só restam ${left} cota(s) deste presente.` },
        { status: 409 }
      );
    }
  }

  const amount = finalQuantity * unitPriceCents;

  // Cria a compra como pendente.
  const { data: purchase, error: insertErr } = await supabase
    .from("purchases")
    .insert({
      gift_id: gift.id,
      buyer_name: buyerName.trim(),
      buyer_email: buyerEmail.trim(),
      message: message?.trim() || null,
      quantity: finalQuantity,
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
      quantity: finalQuantity,
      unitPriceCents,
      itemTitle: gift.valor_livre ? `${gift.title} (valor livre)` : undefined,
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

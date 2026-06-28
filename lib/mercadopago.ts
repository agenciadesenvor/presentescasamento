import "server-only";
import { MercadoPagoConfig, Preference, Payment } from "mercadopago";

const ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN ?? "";

export const isMpConfigured = Boolean(ACCESS_TOKEN);

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

function client() {
  return new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
}

export type CreatePreferenceInput = {
  purchaseId: string;
  title: string;
  quantity: number;
  /** preço de UMA cota, em centavos */
  unitPriceCents: number;
  buyerName: string;
  buyerEmail: string;
};

/** Cria uma preferência de checkout e devolve a URL para redirecionar o convidado. */
export async function createPreference(
  input: CreatePreferenceInput
): Promise<{ url: string; preferenceId: string }> {
  const site = getSiteUrl();
  const pref = new Preference(client());

  const result = await pref.create({
    body: {
      items: [
        {
          id: input.purchaseId,
          title: `${input.title} (${input.quantity} ${
            input.quantity === 1 ? "cota" : "cotas"
          })`,
          quantity: input.quantity,
          unit_price: input.unitPriceCents / 100,
          currency_id: "BRL",
        },
      ],
      payer: {
        name: input.buyerName,
        email: input.buyerEmail,
      },
      external_reference: input.purchaseId,
      back_urls: {
        success: `${site}/obrigado?status=success`,
        pending: `${site}/obrigado?status=pending`,
        failure: `${site}/obrigado?status=failure`,
      },
      auto_return: "approved",
      notification_url: `${site}/api/webhooks/mercadopago`,
      statement_descriptor: "PRESENTE CASAMENTO",
    },
  });

  const url = result.init_point ?? result.sandbox_init_point;
  if (!url) throw new Error("Mercado Pago não retornou a URL de checkout.");

  return { url, preferenceId: String(result.id) };
}

/** Consulta um pagamento pelo id (usado no webhook). */
export async function getPayment(paymentId: string) {
  const payment = new Payment(client());
  return payment.get({ id: paymentId });
}

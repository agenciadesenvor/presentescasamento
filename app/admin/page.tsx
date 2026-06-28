import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { createServerSupabase } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  getGiftsAdmin,
  getPaidPurchases,
  getSettings,
} from "@/lib/data/gifts";
import { CATEGORY_LABELS, formatBRL } from "@/lib/types";
import { signOutAction } from "./actions";
import GiftsManager from "./GiftsManager";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured) redirect("/admin/login");

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [gifts, purchases, settings] = await Promise.all([
    getGiftsAdmin(),
    getPaidPurchases(),
    getSettings(),
  ]);

  const giftTitle = new Map(gifts.map((g) => [g.id, g.title]));
  const totalRaised = purchases.reduce((s, p) => s + p.amount, 0);
  const totalCotas = purchases.reduce((s, p) => s + p.quantity, 0);

  return (
    <main className="min-h-screen bg-cream-50">
      <header className="border-b border-cream-200 bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <div>
            <h1 className="font-serif text-xl text-ink">Painel dos noivos</h1>
            <p className="text-xs text-muted">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="btn-ghost text-sm">
              Ver site <ExternalLink size={15} />
            </Link>
            <form action={signOutAction}>
              <button type="submit" className="btn-ghost text-sm">
                Sair <LogOut size={15} />
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-page space-y-10 py-8">
        {/* Estatísticas */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label="Arrecadado" value={formatBRL(totalRaised)} accent />
          <Stat label="Cotas vendidas" value={String(totalCotas)} />
          <Stat label="Presentes" value={String(gifts.length)} />
          <Stat label="Recados" value={String(purchases.filter((p) => p.message).length)} />
        </section>

        {/* Recados / compras */}
        <section>
          <h2 className="mb-3 font-serif text-lg text-ink">
            Quem já presenteou 💌
          </h2>
          {purchases.length === 0 ? (
            <p className="rounded-xl2 border border-dashed border-cream-200 bg-white p-6 text-center text-sm text-muted">
              Ainda não há presentes confirmados. Eles aparecem aqui assim que o
              pagamento for aprovado.
            </p>
          ) : (
            <div className="space-y-3">
              {purchases.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl2 border border-cream-200 bg-white p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-ink">
                      {p.buyerName}{" "}
                      <span className="font-normal text-muted">
                        presenteou {p.quantity}x ·{" "}
                        {giftTitle.get(p.giftId) ?? "Presente"}
                      </span>
                    </p>
                    <span className="text-sm font-semibold text-forest-600">
                      {formatBRL(p.amount)}
                    </span>
                  </div>
                  {p.message && (
                    <p className="mt-2 rounded-lg bg-cream-50 px-3 py-2 text-sm italic text-ink">
                      “{p.message}”
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted">
                    {p.buyerEmail} ·{" "}
                    {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Gestão de presentes */}
        <GiftsManager gifts={gifts} />

        {/* Configurações do site */}
        <SettingsForm settings={settings} />

        <p className="pb-6 text-center text-xs text-muted">
          Categorias disponíveis:{" "}
          {Object.values(CATEGORY_LABELS).join(" · ")}
        </p>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-xl2 border p-4 ${
        accent
          ? "border-forest-200 bg-forest-50"
          : "border-cream-200 bg-white"
      }`}
    >
      <p className="text-xs text-muted">{label}</p>
      <p
        className={`mt-1 font-serif text-2xl ${
          accent ? "text-forest-600" : "text-ink"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

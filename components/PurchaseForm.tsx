"use client";

import { useState } from "react";
import { Minus, Plus, Loader2, Gift as GiftIcon } from "lucide-react";
import {
  cotasLeft,
  formatBRL,
  VALOR_LIVRE_MAX_CENTS,
  type Gift,
} from "@/lib/types";

const VALORES_RAPIDOS = [5000, 10000, 20000, 30000, 50000];

/** Converte o que o convidado digitou ("150", "150,50", "1.500") em centavos. */
function reaisParaCentavos(texto: string): number | null {
  const s = texto.replace(/[^\d,.]/g, "");
  if (!s) return null;
  let normal = s;
  if (s.includes(",")) normal = s.replace(/\./g, "").replace(",", ".");
  else if (/\.\d{3}$/.test(s) || (s.match(/\./g)?.length ?? 0) > 1)
    normal = s.replace(/\./g, "");
  const n = Number(normal);
  return Number.isFinite(n) ? Math.round(n * 100) : null;
}

export default function PurchaseForm({ gift }: { gift: Gift }) {
  const livre = Boolean(gift.customAmount);
  const left = cotasLeft(gift);
  const [qty, setQty] = useState(1);
  const [valorTexto, setValorTexto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoNotice, setDemoNotice] = useState(false);

  const valorLivre = reaisParaCentavos(valorTexto);
  const total = livre ? valorLivre ?? 0 : qty * gift.cotaPrice;
  const max = Math.min(left, 20);

  if (!livre && left <= 0) {
    return (
      <div className="rounded-xl2 bg-mocha-100 p-6 text-center">
        <p className="font-serif text-lg text-mocha-500">
          🎉 Esse presente já foi todo presenteado!
        </p>
        <p className="mt-1 text-sm text-muted">
          Que tal escolher outra cota? Todas ajudam demais.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDemoNotice(false);

    if (
      livre &&
      (valorLivre === null ||
        valorLivre < gift.cotaPrice ||
        valorLivre > VALOR_LIVRE_MAX_CENTS)
    ) {
      setError(
        `Escolha um valor entre ${formatBRL(gift.cotaPrice)} e ${formatBRL(VALOR_LIVRE_MAX_CENTS)}. 💛`
      );
      return;
    }

    if (!name.trim() || !email.trim()) {
      setError("Preencha seu nome e e-mail, por favor. 🙏");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          giftId: gift.id,
          quantity: livre ? 1 : qty,
          amountCents: livre ? valorLivre : undefined,
          buyerName: name.trim(),
          buyerEmail: email.trim(),
          message: message.trim() || null,
        }),
      });

      const data = await res.json();

      if (data?.demo) {
        setDemoNotice(true);
        setLoading(false);
        return;
      }

      if (!res.ok || !data?.url) {
        throw new Error(data?.error ?? "Não foi possível iniciar o pagamento.");
      }

      window.location.href = data.url as string;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Algo deu errado. Tente de novo em instantes."
      );
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {livre ? (
        <div className="rounded-xl2 border border-cream-200 bg-white p-4">
          <label htmlFor="valor-livre" className="text-sm font-medium text-ink">
            Quanto você quer dar de presente?
          </label>
          <div className="mt-2 flex items-center rounded-xl2 border border-cream-200 bg-cream-50 px-4 transition focus-within:border-forest-400">
            <span className="font-semibold text-muted">R$</span>
            <input
              id="valor-livre"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0,00"
              value={valorTexto}
              onChange={(e) => {
                setValorTexto(e.target.value);
                setError(null);
              }}
              className="w-full bg-transparent px-2 py-3 text-lg font-semibold text-ink outline-none"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {VALORES_RAPIDOS.map((v) => {
              const ativo = valorLivre === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => {
                    setValorTexto(String(v / 100));
                    setError(null);
                  }}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                    ativo
                      ? "border-forest-600 bg-forest-600 text-white"
                      : "border-cream-200 bg-white text-ink hover:border-forest-400"
                  }`}
                >
                  {formatBRL(v).replace(",00", "")}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted">
            A partir de {formatBRL(gift.cotaPrice)} · qualquer valor é um presentão 💛
          </p>
        </div>
      ) : (
      /* Seletor de cotas */
      <div className="flex items-center justify-between rounded-xl2 border border-cream-200 bg-white p-3">
        <div>
          <p className="text-sm font-medium text-ink">Quantas cotas?</p>
          <p className="text-xs text-muted">
            {formatBRL(gift.cotaPrice)} cada · até {max} por vez
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Diminuir"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="grid h-9 w-9 place-items-center rounded-full border border-cream-200 text-ink transition hover:border-forest-400 disabled:opacity-40"
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center text-lg font-semibold tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Aumentar"
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            disabled={qty >= max}
            className="grid h-9 w-9 place-items-center rounded-full border border-cream-200 text-ink transition hover:border-forest-400 disabled:opacity-40"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      )}

      {/* Dados de quem presenteia */}
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl2 border border-cream-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-forest-400"
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl2 border border-cream-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-forest-400"
        />
      </div>

      <textarea
        placeholder="Deixe um recadinho carinhoso (ou engraçado) para os noivos 💌"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        maxLength={400}
        className="w-full resize-none rounded-xl2 border border-cream-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-forest-400"
      />

      {error && (
        <p className="rounded-lg bg-forest-50 px-3 py-2 text-sm text-forest-700">
          {error}
        </p>
      )}

      {demoNotice && (
        <p className="rounded-lg bg-mocha-100 px-3 py-2 text-sm text-mocha-500">
          🛠️ Modo demonstração: o pagamento via Mercado Pago ainda não foi
          conectado. Assim que as credenciais forem configuradas, este botão
          leva direto ao checkout (PIX ou cartão).
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Preparando...
          </>
        ) : (
          <>
            <GiftIcon size={18} />{" "}
            {total > 0 ? `Presentear · ${formatBRL(total)}` : "Presentear"}
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted">
        Pagamento seguro via Mercado Pago · PIX ou cartão
      </p>
    </form>
  );
}

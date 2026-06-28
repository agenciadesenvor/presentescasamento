"use client";

import { useState } from "react";
import { Minus, Plus, Loader2, Gift as GiftIcon } from "lucide-react";
import { cotasLeft, formatBRL, type Gift } from "@/lib/types";

export default function PurchaseForm({ gift }: { gift: Gift }) {
  const left = cotasLeft(gift);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoNotice, setDemoNotice] = useState(false);

  const total = qty * gift.cotaPrice;
  const max = Math.min(left, 20);

  if (left <= 0) {
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
          quantity: qty,
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
      {/* Seletor de cotas */}
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
            <GiftIcon size={18} /> Presentear · {formatBRL(total)}
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted">
        Pagamento seguro via Mercado Pago · PIX ou cartão
      </p>
    </form>
  );
}

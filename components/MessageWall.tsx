"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Loader2, X, Heart } from "lucide-react";
import { postMessage } from "@/lib/actions/messages";
import type { Message } from "@/lib/types";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

/** Inclinação suave e determinística pra dar cara de "cartinha colada no mural". */
function tilt(id: string): number {
  const c = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  return ((c % 5) - 2) * 0.9; // ~ -1.8° a +1.8°
}

export default function MessageWall({ initial }: { initial: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<Message | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !text.trim()) {
      setError("Preencha seu nome e a mensagem. 🙏");
      return;
    }
    setLoading(true);
    const res = await postMessage({ name, message: text, website });
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }
    if (res.message.id !== "ignored") {
      setMessages((prev) => [res.message, ...prev]);
    }
    setName("");
    setText("");
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <div className="grid gap-8 md:grid-cols-5">
      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 md:col-span-2 md:sticky md:top-24 md:self-start"
      >
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          maxLength={60}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl2 border border-cream-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-forest-400"
        />
        <textarea
          placeholder="Escreva um recadinho carinhoso (ou engraçado) pros noivos 💌"
          value={text}
          maxLength={500}
          rows={4}
          onChange={(e) => setText(e.target.value)}
          className="w-full resize-none rounded-xl2 border border-cream-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-forest-400"
        />
        {/* Honeypot anti-bot (invisível) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />

        {error && (
          <p className="rounded-lg bg-forest-50 px-3 py-2 text-sm text-forest-700">
            {error}
          </p>
        )}
        {sent && (
          <p className="rounded-lg bg-mocha-100 px-3 py-2 text-sm text-mocha-600">
            🎉 Recado enviado! Sua cartinha já está no mural.
          </p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Enviando...
            </>
          ) : (
            <>
              <Send size={18} /> Deixar meu recado
            </>
          )}
        </button>
        <p className="text-center text-xs text-muted">
          {messages.length > 0
            ? `${messages.length} ${messages.length === 1 ? "recado já no mural" : "recados já no mural"} 💛`
            : "Seja a primeira pessoa a deixar um recado!"}
        </p>
      </form>

      {/* Mural de cartinhas */}
      <div className="md:col-span-3">
        {messages.length === 0 ? (
          <div className="grid h-full min-h-[180px] place-items-center rounded-xl2 border border-dashed border-cream-200 bg-white/50 p-8 text-center">
            <p className="text-sm text-muted">
              As cartinhas dos convidados vão aparecer aqui, empilhadas com
              carinho. 💌
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.button
                  key={m.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: tilt(m.id) }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  onClick={() => setSelected(m)}
                  className="group flex flex-col rounded-xl2 border border-cream-200 bg-white p-4 text-left shadow-card transition hover:-translate-y-1 hover:shadow-cardHover"
                >
                  <div className="mb-2 flex items-center gap-2 text-forest-600">
                    <Mail size={15} />
                    <span className="font-serif text-base text-ink">
                      {m.name}
                    </span>
                  </div>
                  <p className="line-clamp-4 text-sm italic text-muted">
                    “{m.message}”
                  </p>
                  <span className="mt-3 text-[11px] uppercase tracking-wide text-muted/80">
                    {formatDate(m.createdAt)}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal de leitura */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl bg-cream p-6 shadow-cardHover sm:p-8"
            >
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow-sm transition hover:scale-105"
              >
                <X size={18} />
              </button>
              <div className="mb-3 flex items-center gap-2 text-forest-600">
                <Heart size={16} className="fill-forest-500 text-forest-500" />
                <span className="font-serif text-xl text-ink">
                  {selected.name}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
                {selected.message}
              </p>
              <p className="mt-4 text-xs uppercase tracking-wide text-muted">
                {formatDate(selected.createdAt)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

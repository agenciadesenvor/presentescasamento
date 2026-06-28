"use client";

import { useActionState } from "react";
import { saveSettingsAction } from "./actions";
import type { Settings } from "@/lib/types";

type State = { ok?: boolean; error?: string } | null;

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, formData) => saveSettingsAction(formData),
    null
  );

  return (
    <section>
      <h2 className="mb-3 font-serif text-lg text-ink">Sobre o casal</h2>
      <form
        action={formAction}
        className="space-y-3 rounded-xl2 border border-cream-200 bg-white p-5"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">
              Nomes do casal
            </span>
            <input
              name="couple_names"
              defaultValue={settings.coupleNames}
              className="input"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">
              Data do casamento
            </span>
            <input
              type="date"
              name="wedding_date"
              defaultValue={settings.weddingDate ?? ""}
              className="input"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            Frase de boas-vindas (hero)
          </span>
          <textarea
            name="hero_tagline"
            defaultValue={settings.heroTagline}
            rows={2}
            className="input resize-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            Foto/emoji do topo (URL ou emoji:💍)
          </span>
          <input
            name="hero_photo"
            defaultValue={settings.heroPhoto ?? ""}
            className="input font-mono text-xs"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            Nossa história
          </span>
          <textarea
            name="story"
            defaultValue={settings.story ?? ""}
            rows={3}
            className="input resize-none"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            Chave PIX de reserva (opcional)
          </span>
          <input
            name="pix_key"
            defaultValue={settings.pixKey ?? ""}
            className="input"
          />
        </label>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={pending} className="btn-primary">
            {pending ? "Salvando..." : "Salvar configurações"}
          </button>
          {state?.ok && (
            <span className="text-sm text-mocha-500">Salvo! ✅</span>
          )}
          {state?.error && (
            <span className="text-sm text-forest-600">{state.error}</span>
          )}
        </div>
      </form>
    </section>
  );
}

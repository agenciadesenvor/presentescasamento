"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Upload, Loader2 } from "lucide-react";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  cotasLeft,
  formatBRL,
  type Category,
  type Gift,
} from "@/lib/types";
import {
  saveGiftAction,
  deleteGiftAction,
  uploadPhotoAction,
} from "./actions";

type Draft = {
  id: string | null;
  title: string;
  slug: string;
  description: string;
  category: Category;
  is_fun: boolean;
  cota_price: string;
  total_cotas: string;
  sort_order: string;
  active: boolean;
  photos: string;
};

function toDraft(g?: Gift): Draft {
  return {
    id: g?.id ?? null,
    title: g?.title ?? "",
    slug: g?.slug ?? "",
    description: g?.description ?? "",
    category: g?.category ?? "divertidas",
    is_fun: g?.isFun ?? true,
    cota_price: g ? (g.cotaPrice / 100).toString() : "50",
    total_cotas: g ? String(g.totalCotas) : "20",
    sort_order: g ? String(g.sortOrder) : "0",
    active: g?.active ?? true,
    photos: (g?.photos ?? ["emoji:🎁"]).join("\n"),
  };
}

export default function GiftsManager({ gifts }: { gifts: Gift[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    setError(null);

    const fd = new FormData();
    if (draft.id) fd.set("id", draft.id);
    fd.set("title", draft.title);
    fd.set("slug", draft.slug);
    fd.set("description", draft.description);
    fd.set("category", draft.category);
    if (draft.is_fun) fd.set("is_fun", "on");
    if (draft.active) fd.set("active", "on");
    fd.set("cota_price", draft.cota_price);
    fd.set("total_cotas", draft.total_cotas);
    fd.set("sort_order", draft.sort_order);
    fd.set("photos", draft.photos);

    const res = await saveGiftAction(fd);
    setSaving(false);
    if (res?.error) {
      setError(res.error);
      return;
    }
    setDraft(null);
    router.refresh();
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    const res = await uploadPhotoAction(fd);
    setUploading(false);
    if (res?.error) {
      setError(`Upload: ${res.error}`);
      return;
    }
    if (res?.url && draft) {
      const list = draft.photos.split("\n").map((p) => p.trim()).filter(Boolean);
      setDraft({ ...draft, photos: [...list, res.url].join("\n") });
    }
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-serif text-lg text-ink">Presentes</h2>
        <button
          type="button"
          onClick={() => setDraft(toDraft())}
          className="btn-primary text-sm"
        >
          <Plus size={16} /> Novo presente
        </button>
      </div>

      <div className="overflow-hidden rounded-xl2 border border-cream-200 bg-white">
        {gifts.map((g) => (
          <div
            key={g.id}
            className="flex items-center justify-between gap-3 border-b border-cream-200 px-4 py-3 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="truncate font-medium text-ink">
                {g.title}{" "}
                {!g.active && (
                  <span className="pill bg-cream-200 text-muted">oculto</span>
                )}
              </p>
              <p className="text-xs text-muted">
                {CATEGORY_LABELS[g.category]} · {formatBRL(g.cotaPrice)}/cota ·{" "}
                {g.cotasSold}/{g.totalCotas} vendidas · {cotasLeft(g)} restantes
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setDraft(toDraft(g))}
                className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-cream-50 hover:text-forest-600"
                aria-label="Editar"
              >
                <Pencil size={16} />
              </button>
              <form
                action={deleteGiftAction}
                onSubmit={(e) => {
                  if (!confirm(`Excluir "${g.title}"?`)) e.preventDefault();
                }}
              >
                <input type="hidden" name="id" value={g.id} />
                <button
                  type="submit"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-forest-50 hover:text-forest-600"
                  aria-label="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </form>
            </div>
          </div>
        ))}
        {gifts.length === 0 && (
          <p className="p-6 text-center text-sm text-muted">
            Nenhum presente ainda. Crie o primeiro!
          </p>
        )}
      </div>

      {/* Editor */}
      {draft && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setDraft(null)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave}
            className="max-h-[92vh] w-full max-w-lg space-y-3 overflow-y-auto rounded-t-3xl bg-cream p-5 shadow-cardHover sm:rounded-3xl"
          >
            <h3 className="font-serif text-xl text-ink">
              {draft.id ? "Editar presente" : "Novo presente"}
            </h3>

            <Field label="Título">
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                required
                className="input"
              />
            </Field>

            <Field label="Descrição (capriche no humor 😄)">
              <textarea
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
                rows={3}
                className="input resize-none"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Categoria">
                <select
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value as Category })
                  }
                  className="input"
                >
                  {CATEGORY_ORDER.map((c) => (
                    <option key={c} value={c}>
                      {CATEGORY_LABELS[c]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Preço por cota (R$)">
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={draft.cota_price}
                  onChange={(e) =>
                    setDraft({ ...draft, cota_price: e.target.value })
                  }
                  className="input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Total de cotas">
                <input
                  type="number"
                  min="1"
                  value={draft.total_cotas}
                  onChange={(e) =>
                    setDraft({ ...draft, total_cotas: e.target.value })
                  }
                  className="input"
                />
              </Field>
              <Field label="Ordem (menor aparece antes)">
                <input
                  type="number"
                  value={draft.sort_order}
                  onChange={(e) =>
                    setDraft({ ...draft, sort_order: e.target.value })
                  }
                  className="input"
                />
              </Field>
            </div>

            <Field label="Fotos — uma por linha (URL ou emoji:🍹)">
              <textarea
                value={draft.photos}
                onChange={(e) => setDraft({ ...draft, photos: e.target.value })}
                rows={3}
                className="input resize-none font-mono text-xs"
              />
            </Field>

            <label className="btn-ghost w-full cursor-pointer text-sm">
              {uploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  <Upload size={16} /> Enviar foto
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                  e.target.value = "";
                }}
              />
            </label>

            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={draft.is_fun}
                  onChange={(e) =>
                    setDraft({ ...draft, is_fun: e.target.checked })
                  }
                />
                Cota divertida ✨
              </label>
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(e) =>
                    setDraft({ ...draft, active: e.target.checked })
                  }
                />
                Visível no site
              </label>
            </div>

            {error && (
              <p className="rounded-lg bg-forest-50 px-3 py-2 text-sm text-forest-700">
                {error}
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDraft(null)}
                className="btn-ghost flex-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex-1"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}

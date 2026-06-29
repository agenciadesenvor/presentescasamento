"use client";

import { deleteMessageAction } from "./actions";

/** Botão de apagar recado com confirmação (evita exclusão acidental). */
export default function DeleteMessageButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <form
      action={deleteMessageAction}
      onSubmit={(e) => {
        if (!confirm(`Apagar o recado de "${name}"? Essa ação não tem volta.`)) {
          e.preventDefault();
        }
      }}
      className="shrink-0"
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
      >
        Apagar
      </button>
    </form>
  );
}

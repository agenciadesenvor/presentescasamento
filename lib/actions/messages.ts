"use server";

import { revalidatePath } from "next/cache";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Message } from "@/lib/types";

export type PostMessageInput = {
  name: string;
  message: string;
  /** Honeypot anti-bot: deve vir sempre vazio. */
  website?: string;
};

export type PostMessageResult =
  | { ok: true; message: Message }
  | { ok?: false; error: string };

/** Ação pública: qualquer convidado pode deixar um recado no mural. */
export async function postMessage(
  input: PostMessageInput
): Promise<PostMessageResult> {
  // Honeypot: bots costumam preencher campos escondidos. Fingimos sucesso.
  if (input.website && input.website.trim() !== "") {
    return {
      ok: true,
      message: {
        id: "ignored",
        name: "",
        message: "",
        createdAt: new Date().toISOString(),
      },
    };
  }

  const name = (input.name ?? "").trim().replace(/\s+/g, " ").slice(0, 60);
  const message = (input.message ?? "").trim().slice(0, 500);

  if (!name || !message) {
    return { error: "Preencha seu nome e a mensagem, por favor. 🙏" };
  }
  if (!isSupabaseConfigured) {
    return { error: "Mural indisponível no momento." };
  }

  const db = createAdminClient();
  const { data, error } = await db
    .from("messages")
    .insert({ name, message })
    .select("id, name, message, created_at")
    .single();

  if (error || !data) {
    return { error: "Não foi possível enviar agora. Tente de novo. 💛" };
  }

  revalidatePath("/");

  return {
    ok: true,
    message: {
      id: data.id,
      name: data.name,
      message: data.message,
      createdAt: data.created_at,
    },
  };
}

"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured, isAdminEmail } from "@/lib/supabase/config";

const PHOTO_BUCKET = "gift-photos";

/** Garante que há um admin logado; caso contrário, redireciona ao login. */
async function requireUser() {
  if (!isSupabaseConfigured) redirect("/admin/login");
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !isAdminEmail(user.email)) redirect("/admin/login");
  return user;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

function reaisToCents(value: string): number {
  const n = Number(String(value).replace(",", "."));
  return Math.round((Number.isFinite(n) ? n : 0) * 100);
}

export async function signOutAction() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveGiftAction(formData: FormData) {
  await requireUser();
  const db = createAdminClient();

  const id = (formData.get("id") as string) || null;
  const title = (formData.get("title") as string)?.trim() ?? "";
  let slug = (formData.get("slug") as string)?.trim() ?? "";
  if (!slug) slug = slugify(title);

  const photos = ((formData.get("photos") as string) ?? "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  const payload = {
    title,
    slug,
    description: (formData.get("description") as string)?.trim() ?? "",
    category: (formData.get("category") as string) || "casa",
    is_fun: formData.get("is_fun") === "on",
    cota_price: reaisToCents((formData.get("cota_price") as string) ?? "0"),
    total_cotas: Math.max(
      1,
      Math.floor(Number(formData.get("total_cotas") ?? 1))
    ),
    sort_order: Math.floor(Number(formData.get("sort_order") ?? 0)),
    active: formData.get("active") === "on",
    photos,
  };

  if (!title || payload.cota_price <= 0) {
    return { error: "Preencha ao menos o título e um preço válido." };
  }

  const { error } = id
    ? await db.from("gifts").update(payload).eq("id", id)
    : await db.from("gifts").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteGiftAction(formData: FormData) {
  await requireUser();
  const db = createAdminClient();
  const id = formData.get("id") as string;
  if (id) {
    await db.from("gifts").delete().eq("id", id);
    revalidatePath("/admin");
    revalidatePath("/");
  }
}

export async function saveSettingsAction(formData: FormData) {
  await requireUser();
  const db = createAdminClient();

  const payload = {
    id: true,
    couple_names:
      (formData.get("couple_names") as string)?.trim() || "Os Noivos",
    wedding_date: (formData.get("wedding_date") as string) || null,
    hero_tagline: (formData.get("hero_tagline") as string)?.trim() || null,
    hero_photo: (formData.get("hero_photo") as string)?.trim() || null,
    story: (formData.get("story") as string)?.trim() || null,
    pix_key: (formData.get("pix_key") as string)?.trim() || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await db.from("settings").upsert(payload);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/");
  return { ok: true };
}

/** Faz upload de uma foto para o Storage e devolve a URL pública. */
export async function uploadPhotoAction(formData: FormData) {
  await requireUser();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "Nenhum arquivo selecionado." };

  const db = createAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${randomUUID()}.${ext}`;

  const { error } = await db.storage
    .from(PHOTO_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) return { error: error.message };

  const { data } = db.storage.from(PHOTO_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}

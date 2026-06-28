import "server-only";
import type { Gift, Purchase, Settings } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { SEED_GIFTS, SEED_SETTINGS } from "./seed";

// --- Mapeadores de linha (snake_case do banco -> camelCase do app) ---

type GiftRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Gift["category"];
  is_fun: boolean;
  cota_price: number;
  total_cotas: number;
  cotas_sold: number | null;
  photos: string[] | null;
  sort_order: number;
  active: boolean;
};

function mapGift(row: GiftRow): Gift {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    isFun: row.is_fun,
    cotaPrice: row.cota_price,
    totalCotas: row.total_cotas,
    cotasSold: row.cotas_sold ?? 0,
    photos: row.photos ?? [],
    sortOrder: row.sort_order,
    active: row.active,
  };
}

// --- Leituras públicas ---

/** Presentes ativos, ordenados, com a contagem de cotas vendidas. */
export async function getGifts(): Promise<Gift[]> {
  if (!isSupabaseConfigured) {
    return SEED_GIFTS.filter((g) => g.active).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gifts_public")
    .select("*")
    .eq("active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("getGifts:", error?.message);
    return [];
  }
  return (data as GiftRow[]).map(mapGift);
}

export async function getGiftBySlug(slug: string): Promise<Gift | null> {
  if (!isSupabaseConfigured) {
    return SEED_GIFTS.find((g) => g.slug === slug && g.active) ?? null;
  }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gifts_public")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapGift(data as GiftRow);
}

export async function getSettings(): Promise<Settings> {
  if (!isSupabaseConfigured) return SEED_SETTINGS;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error || !data) return SEED_SETTINGS;
  return {
    coupleNames: data.couple_names,
    weddingDate: data.wedding_date,
    heroPhoto: data.hero_photo,
    heroTagline: data.hero_tagline ?? SEED_SETTINGS.heroTagline,
    story: data.story,
    pixKey: data.pix_key,
  };
}

// --- Leituras administrativas (incluem inativos / dados de comprador) ---

export async function getGiftsAdmin(): Promise<Gift[]> {
  if (!isSupabaseConfigured) {
    return [...SEED_GIFTS].sort((a, b) => a.sortOrder - b.sortOrder);
  }
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("gifts_public")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return (data as GiftRow[]).map(mapGift);
}

type PurchaseRow = {
  id: string;
  gift_id: string;
  buyer_name: string;
  buyer_email: string;
  message: string | null;
  quantity: number;
  amount: number;
  status: Purchase["status"];
  mp_payment_id: string | null;
  created_at: string;
};

function mapPurchase(row: PurchaseRow): Purchase {
  return {
    id: row.id,
    giftId: row.gift_id,
    buyerName: row.buyer_name,
    buyerEmail: row.buyer_email,
    message: row.message,
    quantity: row.quantity,
    amount: row.amount,
    status: row.status,
    mpPaymentId: row.mp_payment_id,
    createdAt: row.created_at,
  };
}

/** Compras pagas, mais recentes primeiro (para o painel admin). */
export async function getPaidPurchases(): Promise<Purchase[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("status", "paid")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as PurchaseRow[]).map(mapPurchase);
}

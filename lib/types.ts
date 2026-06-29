export type Category = "casa" | "lua_de_mel" | "cozinha" | "divertidas";

export type Gift = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Category;
  isFun: boolean;
  /** preço de uma cota, em centavos */
  cotaPrice: number;
  /** total de cotas disponíveis para este presente */
  totalCotas: number;
  /** quantas cotas já foram pagas (derivado) */
  cotasSold: number;
  photos: string[];
  sortOrder: number;
  active: boolean;
};

export type PurchaseStatus = "pending" | "paid" | "failed";

export type Purchase = {
  id: string;
  giftId: string;
  buyerName: string;
  buyerEmail: string;
  message: string | null;
  quantity: number;
  amount: number;
  status: PurchaseStatus;
  mpPaymentId: string | null;
  createdAt: string;
};

export type Settings = {
  coupleNames: string;
  weddingDate: string | null;
  heroPhoto: string | null;
  heroTagline: string;
  story: string | null;
  pixKey: string | null;
};

export const CATEGORY_LABELS: Record<Category, string> = {
  casa: "Pra Casa",
  lua_de_mel: "Lua de Mel",
  cozinha: "Cozinha",
  divertidas: "Divertidas",
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  casa: "🏠",
  lua_de_mel: "✈️",
  cozinha: "🍳",
  divertidas: "😂",
};

export const CATEGORY_ORDER: Category[] = [
  "divertidas",
  "casa",
  "cozinha",
  "lua_de_mel",
];

/** Quantas cotas ainda restam de um presente. */
export function cotasLeft(gift: Pick<Gift, "totalCotas" | "cotasSold">): number {
  return Math.max(0, gift.totalCotas - gift.cotasSold);
}

/** Formata centavos como BRL (ex.: 5000 -> "R$ 50,00"). */
export function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Recado público deixado no mural por um convidado. */
export type Message = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

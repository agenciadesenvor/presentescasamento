import type { Gift, Settings } from "@/lib/types";

/**
 * Dados de demonstração usados quando o Supabase ainda não está configurado.
 * As fotos são URLs reais (Unsplash) — o casal substitui pelas próprias no admin.
 * Esta MESMA lista é inserida no banco pela migration 0001_init.sql.
 */

export const SEED_SETTINGS: Settings = {
  coupleNames: "Elison & Patrícia",
  weddingDate: "2026-10-23",
  heroPhoto: null,
  heroTagline:
    "A gente já tem o principal: um ao outro. Mas se quiser fazer parte da nossa próxima fase (e dar boas risadas), escolhe uma cota aí embaixo. 🤎",
  story: null,
  pixKey: null,
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

type SeedGift = Omit<Gift, "cotasSold"> & { cotasSold?: number };

const RAW: SeedGift[] = [
  {
    id: "jiu-jitsu-do-noivo",
    slug: "jiu-jitsu-do-noivo",
    title: "Um mês de jiu-jitsu pro noivo",
    description:
      "Pra ele descontar no tatame todo o estresse que a noiva causa (com muito amor, claro). Cada cota é um mês de mata-leão terapêutico e paz garantida em casa.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 15000,
    totalCotas: 12,
    cotasSold: 2,
    photos: [
      IMG("photo-1564415315949-7a0c4c73aab4"),
      IMG("photo-1603210185246-b1662978ea37"),
    ],
    sortOrder: 1,
    active: true,
  },
  {
    id: "parcela-do-ps5",
    slug: "parcela-do-ps5",
    title: "Uma parcela do PS5 pro noivo",
    description:
      "Pra ele lembrar que ainda tem sonhos mesmo depois de casado. Cada cota quita uma parcela rumo ao console — e a noiva finge que não viu.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 20000,
    totalCotas: 10,
    cotasSold: 3,
    photos: [
      IMG("photo-1606144042614-b2417e99c4e3"),
      IMG("photo-1607853202273-797f1c22a38e"),
    ],
    sortOrder: 2,
    active: true,
  },
  {
    id: "diaria-de-silencio",
    slug: "diaria-de-silencio",
    title: "Uma diária de silêncio pro noivo",
    description:
      "Um dia inteirinho pra ele jogar em paz, sem nenhum “amor, vem aqui rapidinho”. Cada cota garante mais horas sagradas de concentração total.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 8000,
    totalCotas: 15,
    cotasSold: 5,
    photos: [
      IMG("photo-1560419015-7c427e8ae5ba"),
      IMG("photo-1610041321327-b794c052db27"),
    ],
    sortOrder: 3,
    active: true,
  },
];

export const SEED_GIFTS: Gift[] = RAW.map((g) => ({
  ...g,
  cotasSold: g.cotasSold ?? 0,
}));

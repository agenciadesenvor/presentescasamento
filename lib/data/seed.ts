import type { Gift, Settings } from "@/lib/types";

/**
 * Dados de demonstração usados quando o Supabase ainda não está configurado
 * (ou em desenvolvimento). As fotos no formato "emoji:🍹" são renderizadas como
 * um gradiente divertido com o emoji — o casal substitui por fotos reais no admin.
 *
 * Esta MESMA lista é inserida no banco pela migration 0001_init.sql.
 */

export const SEED_SETTINGS: Settings = {
  coupleNames: "Elison & Patrícia",
  weddingDate: "2026-10-23",
  heroPhoto: null,
  heroTagline:
    "A gente já tem o principal: um ao outro. Mas se quiser fazer parte da nossa próxima fase, escolhe uma cota aí embaixo. 🤎",
  story:
    "Entre encontros, risadas e muitos perrengues divididos, a gente descobriu que a vida fica bem melhor a dois. Agora é pra sempre — e queremos você junto nessa festa.",
  pixKey: null,
};

type SeedGift = Omit<Gift, "cotasSold"> & { cotasSold?: number };

const RAW: SeedGift[] = [
  // ---------- DIVERTIDAS ----------
  {
    id: "caipirinha-lua-de-mel",
    slug: "caipirinha-lua-de-mel",
    title: "Caipirinha na lua de mel",
    description:
      "Cada cota é uma caipirinha gelada que vamos tomar na beira da praia pensando em você. Spoiler: vamos brindar ao seu nome (e talvez chorar de saudade).",
    category: "divertidas",
    isFun: true,
    cotaPrice: 4000,
    totalCotas: 25,
    cotasSold: 7,
    photos: ["emoji:🍹", "emoji:🏖️"],
    sortOrder: 1,
    active: true,
  },
  {
    id: "antironco-madrugada",
    slug: "antironco-madrugada",
    title: "Antironco da madrugada",
    description:
      "Fundo coletivo para travesseiros melhores, faixa nasal e paz conjugal às 3 da manhã. Sua contribuição salva um casamento (o nosso).",
    category: "divertidas",
    isFun: true,
    cotaPrice: 3500,
    totalCotas: 20,
    cotasSold: 4,
    photos: ["emoji:😴", "emoji:🛌"],
    sortOrder: 2,
    active: true,
  },
  {
    id: "pelo-de-pet-no-sofa",
    slug: "pelo-de-pet-no-sofa",
    title: "Pelo de pet no sofá",
    description:
      "Amamos nossos bichos, mas o sofá não. Cada cota vira um pedacinho de aspirador potente. O sofá agradece, os pets nem ligam.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 5000,
    totalCotas: 15,
    cotasSold: 3,
    photos: ["emoji:🐶", "emoji:🐱"],
    sortOrder: 3,
    active: true,
  },
  {
    id: "briga-de-casal-evitada",
    slug: "briga-de-casal-evitada",
    title: "Briga de casal evitada",
    description:
      "Reverte em massagem relaxante e/ou terapia de casal. Funciona melhor que contar até dez. Presente cientificamente comprovado por nós dois.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 7000,
    totalCotas: 12,
    cotasSold: 5,
    photos: ["emoji:🧘", "emoji:💆"],
    sortOrder: 4,
    active: true,
  },
  {
    id: "um-dia-sem-cozinhar",
    slug: "um-dia-sem-cozinhar",
    title: "Um dia sem cozinhar",
    description:
      "Cada cota é um delivery que a gente vai pedir sem culpa nenhuma. Pizza, sushi, açaí: o destino decide. Você só assiste à preguiça vencer.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 4500,
    totalCotas: 30,
    cotasSold: 9,
    photos: ["emoji:🍕", "emoji:🍣"],
    sortOrder: 5,
    active: true,
  },
  {
    id: "tijolo-da-casa-nova",
    slug: "tijolo-da-casa-nova",
    title: "Um tijolo da casa nova",
    description:
      "Literalmente um tijolo. Junte alguns e a gente levanta uma parede. Junte muitos e ganha um quarto com seu nome (mentira, mas o carinho é real).",
    category: "divertidas",
    isFun: true,
    cotaPrice: 3000,
    totalCotas: 50,
    cotasSold: 14,
    photos: ["emoji:🧱", "emoji:🏗️"],
    sortOrder: 6,
    active: true,
  },
  {
    id: "tanque-cheio-lua-de-mel",
    slug: "tanque-cheio-lua-de-mel",
    title: "Tanque cheio rumo à lua de mel",
    description:
      "Combustível para chegar (e voltar) da viagem dos sonhos. Cada cota é um pedaço de estrada com a janela aberta e a playlist no talo.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 6000,
    totalCotas: 20,
    cotasSold: 2,
    photos: ["emoji:⛽", "emoji:🚗"],
    sortOrder: 7,
    active: true,
  },
  {
    id: "vinho-da-segunda-feira",
    slug: "vinho-da-segunda-feira",
    title: "Vinho pra aguentar a segunda",
    description:
      "Uma garrafa boa transforma qualquer segunda em quinta. Ajude a montar nossa adega de sobrevivência semanal.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 5500,
    totalCotas: 24,
    cotasSold: 6,
    photos: ["emoji:🍷", "emoji:🧀"],
    sortOrder: 8,
    active: true,
  },

  // ---------- CASA ----------
  {
    id: "geladeira-dos-sonhos",
    slug: "geladeira-dos-sonhos",
    title: "Geladeira dos sonhos",
    description:
      "Aquela enorme, com dispenser de água e espaço pra esconder sobremesa. Dividida em cotas pra ficar leve no seu bolso e pesada na nossa cozinha.",
    category: "casa",
    isFun: false,
    cotaPrice: 5000,
    totalCotas: 30,
    cotasSold: 11,
    photos: ["emoji:🧊", "emoji:🍦"],
    sortOrder: 10,
    active: true,
  },
  {
    id: "sofa-pra-maratonar",
    slug: "sofa-pra-maratonar",
    title: "Sofá pra maratonar séries",
    description:
      "O trono oficial das nossas noites de pijama. Cada cota é um cantinho confortável onde a gente vai dormir no meio do filme.",
    category: "casa",
    isFun: false,
    cotaPrice: 5000,
    totalCotas: 20,
    cotasSold: 8,
    photos: ["emoji:🛋️", "emoji:📺"],
    sortOrder: 11,
    active: true,
  },
  {
    id: "jogo-de-cama-king",
    slug: "jogo-de-cama-king",
    title: "Jogo de cama king size",
    description:
      "Lençóis macios o suficiente pra ninguém querer levantar. Cada cota é um fio dessa felicidade de algodão egípcio.",
    category: "casa",
    isFun: false,
    cotaPrice: 4000,
    totalCotas: 15,
    cotasSold: 5,
    photos: ["emoji:🛏️", "emoji:🌙"],
    sortOrder: 12,
    active: true,
  },

  // ---------- COZINHA ----------
  {
    id: "jogo-de-panelas",
    slug: "jogo-de-panelas",
    title: "Jogo de panelas completo",
    description:
      "Pra cozinhar pros amigos (e fingir que somos chefs). Cada cota é uma panela onde vai nascer um jantar inesquecível ou um miojo gourmet.",
    category: "cozinha",
    isFun: false,
    cotaPrice: 5000,
    totalCotas: 10,
    cotasSold: 4,
    photos: ["emoji:🍳", "emoji:🥘"],
    sortOrder: 13,
    active: true,
  },
  {
    id: "air-fryer",
    slug: "air-fryer",
    title: "Air fryer (adeus, fritura)",
    description:
      "A gente promete usar todo dia nas primeiras duas semanas. Cada cota nos aproxima de batatas crocantes sem culpa.",
    category: "cozinha",
    isFun: false,
    cotaPrice: 4500,
    totalCotas: 12,
    cotasSold: 7,
    photos: ["emoji:🍟", "emoji:🍗"],
    sortOrder: 14,
    active: true,
  },

  // ---------- LUA DE MEL ----------
  {
    id: "diaria-hotel-dos-sonhos",
    slug: "diaria-hotel-dos-sonhos",
    title: "Diária no hotel dos sonhos",
    description:
      "Aquele hotel com vista pro mar e café da manhã sem hora pra acabar. Cada cota é um pedacinho do nosso descanso merecido.",
    category: "lua_de_mel",
    isFun: false,
    cotaPrice: 5000,
    totalCotas: 40,
    cotasSold: 13,
    photos: ["emoji:🏝️", "emoji:🌅"],
    sortOrder: 15,
    active: true,
  },
  {
    id: "passeio-de-barco",
    slug: "passeio-de-barco",
    title: "Passeio de barco a dois",
    description:
      "Pôr do sol, mar calmo e zero sinal de celular. Cada cota é uma onda mais perto desse momento de cinema.",
    category: "lua_de_mel",
    isFun: false,
    cotaPrice: 8000,
    totalCotas: 15,
    cotasSold: 2,
    photos: ["emoji:⛵", "emoji:🌊"],
    sortOrder: 16,
    active: true,
  },
];

export const SEED_GIFTS: Gift[] = RAW.map((g) => ({
  ...g,
  cotasSold: g.cotasSold ?? 0,
}));

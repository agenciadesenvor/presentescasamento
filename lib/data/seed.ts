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
  {
    id: "pilates-da-noiva",
    slug: "pilates-da-noiva",
    title: "2 sessões de pilates pra noiva",
    description:
      "Pra ela aguentar firme o peso de estar sempre certa (e ela está). Cada cota são duas aulas de alongamento, equilíbrio e paciência reforçada.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 16000,
    totalCotas: 10,
    cotasSold: 1,
    photos: [
      IMG("photo-1747239069226-55382c570116"),
      IMG("photo-1579454566790-f9e5697ddf36"),
    ],
    sortOrder: 4,
    active: true,
  },
  {
    id: "massagem-da-noiva",
    slug: "massagem-da-noiva",
    title: "1 sessão de massagem pra noiva",
    description:
      "Pra relaxar os ombros depois de explicar a mesma coisa pela quinta vez. Cada cota é uma hora de paz total e zero perguntas repetidas.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 12000,
    totalCotas: 12,
    cotasSold: 4,
    photos: [
      IMG("photo-1600334089648-b0d9d3028eb2"),
      IMG("photo-1515377905703-c4788e51af15"),
    ],
    sortOrder: 5,
    active: true,
  },
  {
    id: "robo-aspirador-da-paz",
    slug: "robo-aspirador-da-paz",
    title: "Um robô aspirador pra paz do lar",
    description:
      "Pra encerrar de vez a discussão milenar de quem vai limpar. Cada cota é um pedacinho do nosso novo melhor amigo (que trabalha sozinho).",
    category: "divertidas",
    isFun: true,
    cotaPrice: 13000,
    totalCotas: 12,
    cotasSold: 3,
    photos: [
      IMG("photo-1558317374-067fb5f30001"),
      IMG("photo-1600322305530-45714a0bc945"),
    ],
    sortOrder: 7,
    active: true,
  },
  {
    id: "terapia-de-casal",
    slug: "terapia-de-casal",
    title: "Uma rodada de terapia de casal",
    description:
      "Pra decidir, com ajuda profissional, de quem é a culpa (a gente já sabe, mas é bom ter testemunha). Cada cota é uma sessão rumo ao “eu te entendo”.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 14000,
    totalCotas: 10,
    cotasSold: 2,
    photos: [
      IMG("photo-1551847677-dc82d764e1eb"),
      IMG("photo-1541976844346-f18aeac57b06"),
    ],
    sortOrder: 8,
    active: true,
  },
  {
    id: "foto-chique-no-chile",
    slug: "foto-chique-no-chile",
    title: "Uma foto bonita no Chile",
    description:
      "Pra provar pra geral que a lua de mel foi chique de doer. Cada cota é um clique digno de moldura (e de muita inveja no feed).",
    category: "divertidas",
    isFun: true,
    cotaPrice: 9000,
    totalCotas: 20,
    cotasSold: 3,
    photos: [
      IMG("photo-1558517286-6b7b81953cb5"),
      IMG("photo-1715356758153-6d58ae44e8fe"),
    ],
    sortOrder: 9,
    active: true,
  },
  {
    id: "ingresso-do-corinthians",
    slug: "ingresso-do-corinthians",
    title: "Um ingresso pro jogo do Corinthians",
    description:
      "Porque o noivo também merece sofrer fora do casamento. Cada cota é um lugar na arquibancada pra ele gritar com o juiz em paz.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 12000,
    totalCotas: 11,
    cotasSold: 4,
    photos: ["/gifts/neo-quimica-arena-1.jpg", "/gifts/neo-quimica-arena-2.jpg"],
    sortOrder: 10,
    active: true,
  },
  {
    id: "passeio-a-dois",
    slug: "passeio-a-dois",
    title: "Um passeio a dois",
    description:
      "Pra lembrar que ainda existe vida (e romance) fora do sofá. Cada cota banca um rolê especial do casal — aquele programa que a gente sempre adia.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 30000,
    totalCotas: 6,
    cotasSold: 1,
    photos: [
      IMG("photo-1682024619121-aabb0305a496"),
      IMG("photo-1570075017462-b5478b3abfff"),
    ],
    sortOrder: 11,
    active: true,
  },
  {
    id: "portillo-laguna-del-inca",
    slug: "portillo-laguna-del-inca",
    title: "Portillo e Laguna del Inca",
    description:
      "O centro de esqui mais antigo do Hemisfério Sul, a 2.600m nos Andes, com a deslumbrante Laguna del Inca de águas azul-turquesa. Tour guiado saindo de Santiago, com coquetel a bordo. (O passeio mais procurado do roteiro!)",
    category: "lua_de_mel",
    isFun: false,
    cotaPrice: 38800,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1614586125858-e695dd97d1b6"),
      IMG("photo-1610226977301-986edce66047"),
    ],
    sortOrder: 12,
    active: true,
  },
  {
    id: "embalse-el-yeso",
    slug: "embalse-el-yeso",
    title: "Embalse el Yeso",
    description:
      "Uma aventura pelos Andes até a represa gigante cercada de montanhas, com uma vista de tirar o fôlego. Tour guiado saindo de Santiago, pelo Cajón del Maipo.",
    category: "lua_de_mel",
    isFun: false,
    cotaPrice: 32300,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1589071780475-89033c3cef5a"),
      IMG("photo-1719258179071-8f04134d6796"),
    ],
    sortOrder: 13,
    active: true,
  },
  {
    id: "embalse-el-yeso-termas",
    slug: "embalse-el-yeso-termas",
    title: "Embalse el Yeso e Termas da Colina",
    description:
      "O azul do Embalse El Yeso somado ao relaxamento nas águas termais naturais das Termas da Colina, em meio às montanhas. Inclui café da manhã e roupão personalizado.",
    category: "lua_de_mel",
    isFun: false,
    cotaPrice: 54900,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1709214406424-7acd64e9c438"),
      IMG("photo-1600024102232-cb447dea5ba3"),
    ],
    sortOrder: 14,
    active: true,
  },
  {
    id: "triturador-de-alimentos",
    slug: "triturador-de-alimentos",
    title: "Triturador de alimentos",
    description:
      "Pra dar fim aos restos de comida direto na pia, sem entupimento e sem aquela discussão de quem limpa. Praticidade que a cozinha nova merece.",
    category: "cozinha",
    isFun: false,
    cotaPrice: 7000,
    totalCotas: 10,
    cotasSold: 0,
    photos: [
      IMG("photo-1565538810643-b5bdb714032a"),
      IMG("photo-1609210884848-2d530cfb2a07"),
    ],
    sortOrder: 15,
    active: true,
  },
];

export const SEED_GIFTS: Gift[] = RAW.map((g) => ({
  ...g,
  cotasSold: g.cotasSold ?? 0,
}));

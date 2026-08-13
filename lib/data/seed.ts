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
    cotaPrice: 25000,
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
    active: false, // removido do site (soft-delete: há compra paga real)
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
    title: "2 ingressos pro jogo do Corinthians",
    description:
      "Porque o noivo também merece sofrer fora do casamento — e agora acompanhado. São dois lugares na arquibancada pra torcer (e xingar o juiz) a dois.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 25000,
    totalCotas: 1,
    cotasSold: 0,
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
    cotaPrice: 22000,
    totalCotas: 1,
    cotasSold: 0,
    photos: ["/gifts/triturador-1.jpg", "/gifts/triturador-2.jpg"],
    sortOrder: 15,
    active: true,
  },
  {
    id: "mixer",
    slug: "mixer",
    title: "Mixer",
    description:
      "Pra deixar a cozinha completíssima — bater, misturar e preparar de tudo com praticidade de chef.",
    category: "cozinha",
    isFun: false,
    cotaPrice: 24000,
    totalCotas: 1,
    cotasSold: 0,
    photos: ["/gifts/mixer.jpg"],
    sortOrder: 16,
    active: true,
  },
  {
    id: "aspirador-portatil",
    slug: "aspirador-portatil",
    title: "Aspirador de pó portátil",
    description:
      "Pra dar aquela geral rapidinho sem arrastar mangueira pela casa toda — leve, sem fio e sempre à mão pra deixar o cantinho novo impecável.",
    category: "casa",
    isFun: false,
    cotaPrice: 25000,
    totalCotas: 1,
    cotasSold: 0,
    photos: ["/gifts/aspirador-portatil.jpg"],
    sortOrder: 17,
    active: true,
  },
  {
    id: "kit-panelas-inox",
    slug: "kit-panelas-inox",
    title: "Kit de panelas inox",
    description:
      "Aço inox de verdade, com fundo triplo pra distribuir o calor por igual — do arroz de todo dia ao jantar especial. O tipo de kit que dura o casamento inteiro (e olha que é pra durar bastante).",
    category: "cozinha",
    isFun: false,
    cotaPrice: 55000,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1604414499020-f9ac575bc5ec"),
      IMG("photo-1511224931379-b4e4324ea7fc"),
    ],
    sortOrder: 18,
    active: true,
  },
  {
    id: "jogo-de-cama-casal",
    slug: "jogo-de-cama-casal",
    title: "Jogo de cama casal",
    description:
      "Pra noite de sono valer por dois — 100% algodão, macio de deitar e não querer mais levantar. O aconchego que o quarto novo do casal merece.",
    category: "casa",
    isFun: false,
    cotaPrice: 30000,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1728614669329-29e10a0698ea"),
      IMG("photo-1606855637183-ea2a00b6f15f"),
    ],
    sortOrder: 19,
    active: true,
  },
  {
    id: "jogo-de-toalhas-banho",
    slug: "jogo-de-toalhas-banho",
    title: "Jogo de toalhas de banho",
    description:
      "Felpudas, macias e daquelas que abraçam depois do banho. Um jogo completo pra sair da água direto pro conforto.",
    category: "casa",
    isFun: false,
    cotaPrice: 20000,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1639298109207-5a9ccc254481"),
      IMG("photo-1760722974657-f64bce2f9cc5"),
    ],
    sortOrder: 20,
    active: true,
  },
  {
    id: "jogo-de-facas",
    slug: "jogo-de-facas",
    title: "Jogo de facas / cutelaria",
    description:
      "Lâminas afiadas de aço inox com suporte — pra picar, fatiar e cortar como gente grande na cozinha nova. Chega de faca cega emprestada.",
    category: "cozinha",
    isFun: false,
    cotaPrice: 20000,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1636412191749-53d84f5f3eb0"),
      IMG("photo-1577398628388-516477602b3b"),
    ],
    sortOrder: 21,
    active: true,
  },
  {
    id: "teleferico-santiago",
    slug: "teleferico-santiago",
    title: "Teleférico de Santiago",
    description:
      "Subir o Cerro San Cristóbal de teleférico e ver Santiago inteirinha aos pés, com a Cordilheira dos Andes ao fundo. Passeio guiado com teleférico + funicular — a vista mais bonita da cidade.",
    category: "lua_de_mel",
    isFun: false,
    cotaPrice: 25000,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      "/gifts/teleferico-santiago.jpg",
      IMG("photo-1693643210415-195688c860f8"),
    ],
    sortOrder: 22,
    active: true,
  },
  {
    id: "vinicola-alyan",
    slug: "vinicola-alyan",
    title: "Vinícola Alyan (Sunset)",
    description:
      "Fim de tarde entre as parreiras: degustação de vinhos premium, tábua de queijos e um jantar vendo o sol se pôr sobre os Andes. A experiência de enoturismo mais romântica do roteiro, com transfer incluído.",
    category: "lua_de_mel",
    isFun: false,
    cotaPrice: 30000,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      "/gifts/vinicola-alyan.jpg",
      IMG("photo-1567072629554-20e689de2400"),
    ],
    sortOrder: 23,
    active: true,
  },
  {
    id: "jantar-no-chile",
    slug: "jantar-no-chile",
    title: "Um jantar romântico no Chile",
    description:
      "Uma noite só de vocês dois no Chile: mesa reservada, brinde com vinho chileno e aquele jantar que fecha a lua de mel com chave de ouro.",
    category: "lua_de_mel",
    isFun: false,
    cotaPrice: 30000,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1731941465921-eb4285693713"),
      IMG("photo-1706586346290-68657e61cfc4"),
    ],
    sortOrder: 24,
    active: true,
  },
  {
    id: "jantar-em-sao-paulo",
    slug: "jantar-em-sao-paulo",
    title: "Um jantar a dois em São Paulo",
    description:
      "Pra provar que casado também namora: um jantar a dois em São Paulo, longe da pia e da Netflix. Romance renovado — e ninguém lava a louça depois.",
    category: "divertidas",
    isFun: true,
    cotaPrice: 25000,
    totalCotas: 1,
    cotasSold: 0,
    photos: [
      IMG("photo-1414235077428-338989a2e8c0"),
      IMG("photo-1723132688333-83018f3560be"),
    ],
    sortOrder: 25,
    active: true,
  },
];

export const SEED_GIFTS: Gift[] = RAW.map((g) => ({
  ...g,
  cotasSold: g.cotasSold ?? 0,
}));

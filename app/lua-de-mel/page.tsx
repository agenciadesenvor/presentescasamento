import type { Metadata } from "next";
import Image from "next/image";

// Página privada do casal: sem link em lugar nenhum do site e fora dos buscadores.
export const metadata: Metadata = {
  title: "Nossa Lua de Mel • Elison & Patrícia",
  robots: { index: false, follow: false },
};

type Dia = {
  numero: string;
  titulo: string;
  emoji: string;
  descricao: string;
  detalhes?: string[];
};

const ROTEIRO: Dia[] = [
  {
    numero: "Dia 1",
    titulo: "Chegada em Santiago",
    emoji: "✈️",
    descricao:
      "Voo, check-in no hotel e aquele primeiro passeio sem pressa pra sentir o clima da cidade.",
    detalhes: [
      "Caminhada pelo bairro Lastarria",
      "Jantar leve e taça de vinho pra abrir a viagem",
    ],
  },
  {
    numero: "Dia 2",
    titulo: "Cerro San Cristóbal",
    emoji: "🚡",
    descricao:
      "Subida de teleférico + funicular até o alto do Parque Metropolitano — Santiago inteira aos nossos pés.",
    detalhes: [
      "Teleférico + funicular (presente dos nossos convidados 🤎)",
      "Vista da Virgem no topo e piquenique no parque",
    ],
  },
  {
    numero: "Dia 3",
    titulo: "Sky Costanera",
    emoji: "🌇",
    descricao:
      "Café da manhã farto e, no fim da tarde, o pôr do sol do topo do prédio mais alto da América do Sul.",
    detalhes: [
      "Café da manhã reforçado no hotel",
      "Sky Costanera ao entardecer — luzes da cidade acendendo",
    ],
  },
  {
    numero: "Dia 4",
    titulo: "Vinícola Alyan — Sunset",
    emoji: "🍷",
    descricao:
      "Fim de tarde entre parreiras: degustação de vinhos premium, tábua de queijos e jantar vendo o sol se pôr sobre os Andes.",
    detalhes: [
      "Transfer incluído, tour guiado em português",
      "Brinde ao pôr do sol 🥂",
    ],
  },
  {
    numero: "Dia 5",
    titulo: "Embalse el Yeso + Termas da Colina",
    emoji: "🏔️",
    descricao:
      "Dia inteiro nos Andes: o azul irreal da represa e depois o relaxamento nas águas termais naturais.",
    detalhes: [
      "Cajón del Maipo no caminho",
      "Café da manhã e roupão personalizado inclusos",
    ],
  },
  {
    numero: "Dia 6",
    titulo: "Portillo e Laguna del Inca",
    emoji: "⛷️",
    descricao:
      "O centro de esqui mais antigo do Hemisfério Sul, a 2.600m, com a lagoa azul-turquesa que dá nome ao passeio.",
    detalhes: [
      "Tour guiado com coquetel a bordo",
      "Muitas fotos dignas de moldura 📸",
    ],
  },
  {
    numero: "Dia 7",
    titulo: "Último dia — Amor y Pasta",
    emoji: "🍝",
    descricao:
      "Manhã livre pra compras e lembrancinhas, e à noite o jantar de despedida no restaurante mais charmoso de Santiago.",
    detalhes: [
      "Compras no centro / feirinhas",
      "Jantar no Amor y Pasta pra fechar com chave de ouro",
    ],
  },
];

export default function LuaDeMelPage() {
  return (
    <main className="min-h-screen bg-cream-100">
      <header className="bg-forest-600 px-6 pb-14 pt-16 text-center">
        <Image
          src="/hero-monograma.svg"
          alt="Monograma Elison & Patrícia"
          width={90}
          height={83}
          className="mx-auto"
        />
        <h1 className="mt-6 font-serif text-3xl text-cream-100 sm:text-4xl">
          Nossa Lua de Mel
        </h1>
        <p className="mt-2 text-sm text-forest-100 sm:text-base">
          Santiago do Chile 🇨🇱 · primavera nos Andes
        </p>
        <p className="mx-auto mt-4 max-w-md text-xs text-forest-200">
          Página só nossa 🤫 — o roteirinho do começo da nossa próxima fase.
        </p>
      </header>

      <section className="container-page mx-auto max-w-2xl px-6 py-12">
        <ol className="relative space-y-8 border-l-2 border-forest-200 pl-6">
          {ROTEIRO.map((dia) => (
            <li key={dia.numero} className="relative">
              <span className="absolute -left-[37px] grid h-9 w-9 place-items-center rounded-full border-2 border-forest-200 bg-cream-50 text-base">
                {dia.emoji}
              </span>
              <div className="rounded-xl2 border border-cream-200 bg-white p-5 shadow-card">
                <p className="text-xs font-medium uppercase tracking-wide text-mocha-400">
                  {dia.numero}
                </p>
                <h2 className="mt-1 font-serif text-xl text-ink">
                  {dia.titulo}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {dia.descricao}
                </p>
                {dia.detalhes && (
                  <ul className="mt-3 space-y-1">
                    {dia.detalhes.map((d) => (
                      <li key={d} className="text-xs text-forest-500">
                        • {d}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-center font-serif text-lg text-mocha-500">
          A gente, os Andes e o resto da vida pela frente. 🤎
        </p>
      </section>
    </main>
  );
}

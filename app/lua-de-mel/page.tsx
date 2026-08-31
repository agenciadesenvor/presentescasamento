import type { Metadata } from "next";
import Image from "next/image";

// Página privada do casal: sem link em lugar nenhum do site e fora dos buscadores.
export const metadata: Metadata = {
  title: "Nossa Lua de Mel • Elison & Patrícia",
  robots: { index: false, follow: false },
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;

type Atividade = { hora?: string; texto: string };

type Dia = {
  badge: string;
  titulo: string;
  fotos: string[];
  atividades: Atividade[];
};

const DIAS: Dia[] = [
  {
    badge: "Seg · 26/10",
    titulo: "Chegada + Liberdade",
    fotos: [IMG("photo-1617870314635-fc819547ec11")],
    atividades: [
      { hora: "7h25", texto: "Chegada em GRU" },
      { texto: "Ir pro hotel na República e deixar as malas" },
      { texto: "Café da manhã / brunch no Café Station, na Liberdade" },
      {
        texto:
          "Praça da Liberdade, Rua Galvão Bueno, lojinhas e mercados orientais",
      },
      { texto: "Almoço na Liberdade" },
      { hora: "15h", texto: "Check-in no hotel" },
      { texto: "Noite leve: jantar perto da República ou Santa Cecília" },
    ],
  },
  {
    badge: "Ter · 27/10",
    titulo: "Centro histórico + Paulista",
    fotos: [IMG("photo-1637028330542-4c27164165f4")],
    atividades: [
      {
        hora: "Manhã",
        texto:
          "Theatro Municipal, Viaduto do Chá, Mosteiro de São Bento e Farol Santander",
      },
      { texto: "Almoço no Centro ou Mercado Municipal" },
      { hora: "Tarde", texto: "Avenida Paulista + MASP" },
      { texto: "Jantar na Paulista/Jardins ou volta pra República" },
    ],
  },
  {
    badge: "Qua · 28/10",
    titulo: "Ibirapuera + Corinthians",
    fotos: [
      IMG("photo-1605050851738-78b9459d1c4c"),
      "/gifts/neo-quimica-arena-1.jpg",
    ],
    atividades: [
      { hora: "Manhã", texto: "Parque Ibirapuera" },
      {
        texto:
          "Caminhada pelo lago, Marquise, Monumento às Bandeiras e entorno do Auditório",
      },
      { texto: "Almoço leve" },
      { texto: "Voltar ao hotel pra descansar" },
      {
        hora: "Noite",
        texto: "Corinthians x Mirassol, na Neo Química Arena 🖤🤍",
      },
      { texto: "Ir de metrô pela Linha 3-Vermelha até Corinthians-Itaquera" },
    ],
  },
];

const NOTAS = [
  "Paulista fica na terça porque muita coisa fecha na segunda.",
  "Não vale encaixar tour/museu da arena no dia do jogo.",
  "Pro jogo, sair da República com 2h a 2h30 de antecedência.",
];

export default function LuaDeMelPage() {
  return (
    <main className="min-h-screen bg-cream-50 pb-16">
      <header className="mx-auto max-w-3xl px-5 pb-2 pt-10 sm:pt-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-mocha-400">
          Nossa lua de mel · página só nossa 🤫
        </p>
        <h1 className="mt-2 font-serif text-3xl text-ink sm:text-5xl">
          Roteiro São Paulo
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-cream-200 bg-white px-4 py-1.5 text-xs font-medium text-ink shadow-card">
            📅 26 a 28 de outubro
          </span>
          <span className="rounded-full border border-cream-200 bg-white px-4 py-1.5 text-xs font-medium text-ink shadow-card">
            🏨 Hotel na República
          </span>
          <span className="rounded-full border border-cream-200 bg-white px-4 py-1.5 text-xs font-medium text-ink shadow-card">
            🚇 Rolês de metrô
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-3xl space-y-8 px-5 pt-8">
        {DIAS.map((dia) => (
          <article
            key={dia.badge}
            className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-card transition hover:shadow-cardHover"
          >
            <div
              className={`relative grid h-56 sm:h-72 ${
                dia.fotos.length > 1 ? "grid-cols-2 gap-0.5" : ""
              }`}
            >
              {dia.fotos.map((foto) => (
                <div key={foto} className="relative">
                  <Image
                    src={foto}
                    alt={dia.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              ))}
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-ink shadow-card backdrop-blur">
                {dia.badge}
              </span>
            </div>
            <div className="p-5 sm:p-7">
              <h2 className="font-serif text-2xl text-ink">{dia.titulo}</h2>
              <ul className="mt-4 divide-y divide-cream-200">
                {dia.atividades.map((a) => (
                  <li key={a.texto} className="flex items-start gap-3 py-3">
                    {a.hora ? (
                      <span className="mt-0.5 shrink-0 rounded-full bg-forest-50 px-2.5 py-0.5 text-[11px] font-semibold text-forest-600">
                        {a.hora}
                      </span>
                    ) : (
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mocha-300" />
                    )}
                    <span className="text-sm leading-relaxed text-ink/80">
                      {a.texto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <aside className="rounded-3xl border border-forest-100 bg-forest-50 p-5 sm:p-7">
          <h2 className="font-serif text-xl text-forest-700">📌 Notas</h2>
          <ul className="mt-3 space-y-2">
            {NOTAS.map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-forest-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-400" />
                {n}
              </li>
            ))}
          </ul>
        </aside>

        <aside className="rounded-3xl border-2 border-dashed border-mocha-200 bg-white/60 p-5 text-center sm:p-7">
          <p className="font-serif text-lg text-mocha-500">
            Próxima parada: Chile 🇨🇱
          </p>
          <p className="mt-1 text-sm text-muted">
            Roteiro em construção — Santiago que nos aguarde. 🏔️
          </p>
        </aside>

        <p className="pt-2 text-center font-serif text-lg text-mocha-500">
          A gente e o resto da vida pela frente. 🤎
        </p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Heart,
  Info,
  MapPin,
  Mountain,
  Plane,
  Sparkles,
  Ticket,
  TrainFront,
} from "lucide-react";
import "./lua-de-mel.css";
import TripSwitcher from "./TripSwitcher";

// Página privada do casal (design criado por eles no Codex e portado pra cá):
// sem link em lugar nenhum do site e fora dos buscadores.
export const metadata: Metadata = {
  title: "Nossa Lua de Mel | Patrícia & Elison",
  description: "O roteiro de lua de mel de Patrícia e Elison por São Paulo e Chile.",
  robots: { index: false, follow: false },
};

// Uma parada é só o texto, ou [horário, texto] quando tem hora marcada.
type Parada = string | [string, string];

type Passeio = {
  data: string;
  titulo: string;
  foto: string;
  alt: string;
  horario: string;
  preco?: string;
  extra?: string;
  descricao: string;
  roteiro: Parada[];
  incluso?: string[];
};

const SAO_PAULO: Passeio[] = [
  {
    data: "Seg · 26/10",
    titulo: "Chegada + Liberdade",
    foto: "/lua-de-mel/liberdade.jpg",
    alt: "Rua do bairro da Liberdade decorada com lanternas orientais",
    horario: "7h25 até a noite",
    extra: "Base: hotel na República",
    descricao:
      "Chegada em Guarulhos, malas no hotel e o primeiro dia sem pressa pelo bairro oriental mais charmoso de São Paulo.",
    roteiro: [
      ["7h25", "Chegada em GRU"],
      "Hotel na República pra deixar as malas",
      "Brunch no Café Station, na Liberdade",
      "Praça da Liberdade, Rua Galvão Bueno, lojinhas e mercados orientais",
      "Almoço na Liberdade",
      ["15h", "Check-in no hotel"],
      ["Noite", "Jantar leve na República ou Santa Cecília"],
    ],
  },
  {
    data: "Ter · 27/10",
    titulo: "Centro histórico + Paulista",
    foto: "/lua-de-mel/paulista.jpg",
    alt: "MASP e movimento na Avenida Paulista",
    horario: "Manhã até a noite",
    extra: "Paulista fica na terça: muita coisa fecha na segunda",
    descricao:
      "São Paulo raiz: prédios históricos pela manhã e o fim de tarde na avenida mais famosa da cidade.",
    roteiro: [
      ["Manhã", "Theatro Municipal e Viaduto do Chá"],
      "Mosteiro de São Bento e Farol Santander",
      ["Almoço", "No Centro ou no Mercado Municipal"],
      ["Tarde", "Avenida Paulista + MASP"],
      ["Noite", "Jantar na Paulista/Jardins ou volta pra República"],
    ],
  },
  {
    data: "Qua · 28/10",
    titulo: "Ibirapuera + Corinthians",
    foto: "/lua-de-mel/arena.jpg",
    alt: "Exterior da Neo Química Arena",
    horario: "Manhã até o jogo",
    extra: "Sair da República 2h a 2h30 antes do jogo",
    descricao:
      "Manhã verde no Ibirapuera, pausa pra recarregar e, à noite, Neo Química Arena em clima de jogo.",
    roteiro: [
      ["Manhã", "Parque Ibirapuera"],
      "Lago, Marquise, Monumento às Bandeiras e entorno do Auditório",
      "Almoço leve e descanso no hotel",
      "Linha 3–Vermelha até Corinthians–Itaquera",
      ["Noite", "Corinthians x Mirassol"],
    ],
  },
];

const CHILE: Passeio[] = [
  {
    data: "Qui · 29/10",
    titulo: "Chegada em Santiago",
    foto: "/lua-de-mel/costanera.jpg",
    alt: "Gran Torre Santiago, no Costanera Center, com a Cordilheira ao fundo",
    horario: "Chegada + dia livre",
    extra: "Costanera Center e compras",
    descricao:
      "Pouso em Santiago, mercado pra abastecer o apê e o primeiro gostinho da cidade no Costanera Center.",
    roteiro: [
      "Passeio no Costanera Center",
      "Mercado: compras pro apê",
      "Compras pro passeio do dia seguinte",
      ["Noite", "Jantar no MUT ou perto do hotel"],
    ],
  },
  {
    data: "Sex · 30/10",
    titulo: "Cordilheira Sunset",
    foto: "/lua-de-mel/cordilheira-sunset.jpg",
    alt: "Pôr do sol sobre a Cordilheira dos Andes nevada",
    horario: "7h a 8h de passeio",
    preco: "R$ 309,68/pessoa",
    extra: "Bora pro Chile · $48.000 CLP",
    descricao:
      "Mirantes, estações de esqui e o pôr do sol com piquenique lá no alto. O retorno acontece depois que o sol se põe.",
    roteiro: [
      "Mirante Curva 32 (vista panorâmica)",
      "Tour panorâmico no Valle Nevado",
      "Tour panorâmico em Farellones",
      "Pôr do sol e piquenique no Refúgio Bora pro Chile, em Farellones",
    ],
  },
  {
    data: "Sáb · 31/10",
    titulo: "Cajón del Maipo y Embalse + Termas de Colina",
    foto: "/lua-de-mel/embalse-el-yeso.jpg",
    alt: "Embalse El Yeso cercado por montanhas nevadas",
    horario: "5:00 às 18:00",
    preco: "R$ 499/pessoa",
    descricao:
      "Passeio para contemplação e banho, com saída do hotel a partir das 5 da manhã e retorno em Santiago previsto às 18h.",
    roteiro: [
      "San José del Maipo",
      "Casa de Chocolate",
      "Túnel Tinoco",
      "Rio Maipo",
      "Embalse el Yeso",
      "Termas de Colina",
    ],
    incluso: ["Transporte", "Guia", "Piquenique", "Ingresso termas"],
  },
  {
    data: "Dom · 01/11",
    titulo: "Portillo y Laguna del Inca",
    foto: "/lua-de-mel/laguna-del-inca.jpg",
    alt: "Laguna del Inca, em Portillo, cercada pelas montanhas nevadas",
    horario: "5:00 às 15:30",
    preco: "R$ 289/pessoa",
    descricao:
      "Passeio para contemplação, com saída do hotel a partir das 5 da manhã e retorno em Santiago previsto às 15h30.",
    roteiro: [
      "Salto del Soldado",
      "Curva Caracoles",
      "Fronteira Chile x Argentina",
      "Laguna del Inca",
    ],
    incluso: ["Transporte", "Guia", "Piquenique"],
  },
];

function PasseioCard({ p }: { p: Passeio }) {
  return (
    <article className="tour-card">
      <div className="tour-photo">
        <img src={p.foto} alt={p.alt} loading="lazy" />
        <span className="tour-date">{p.data}</span>
        <h3 className="tour-title">{p.titulo}</h3>
      </div>
      <div className="tour-body">
        <div className="tour-meta">
          <Clock3 size={17} aria-hidden="true" />
          <span>{p.horario}</span>
          {p.preco && (
            <>
              <span className="dot" aria-hidden="true" />
              <strong>{p.preco}</strong>
            </>
          )}
        </div>
        {p.extra && (
          <span className="tour-extra">
            <Ticket size={14} aria-hidden="true" /> {p.extra}
          </span>
        )}
        <p className="tour-desc">{p.descricao}</p>

        <span className="tour-pill">Roteiro</span>
        <ul className="tour-checks">
          {p.roteiro.map((parada) => {
            const [hora, texto] = Array.isArray(parada) ? parada : [null, parada];
            return (
              <li key={texto}>
                <CircleCheck size={18} aria-hidden="true" />
                <span>
                  {hora && <strong>{hora}</strong>}
                  {texto}
                </span>
              </li>
            );
          })}
        </ul>

        {p.incluso && (
          <>
            <span className="tour-pill">Incluso</span>
            <div className="tour-tags">
              {p.incluso.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default function LuaDeMelPage() {
  return (
    <main className="ldm">
      <header className="site-header">
        <a className="brand" href="#topo" aria-label="Voltar ao início">
          <span className="brand-mark">
            P<span>&</span>E
          </span>
          <span className="brand-copy">
            Patrícia & Elison<small>lua de mel • 2026</small>
          </span>
        </a>
        <a className="header-pill" href="#roteiro">
          <CalendarDays size={17} aria-hidden="true" /> 26 out – 01 nov
        </a>
      </header>

      <div className="page-shell" id="topo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">
              <Heart size={14} fill="currentColor" /> Nossa lua de mel
            </span>
            <h1 id="hero-title">Do coração de São Paulo às paisagens do Chile.</h1>
            <p>
              Um cantinho para guardar cada plano, cada parada e tudo o que
              queremos viver juntos nessa viagem.
            </p>
            <div className="hero-meta" aria-label="Resumo da viagem">
              <span>
                <Plane size={17} /> Recife
              </span>
              <span className="route-line" aria-hidden="true" />
              <span>São Paulo</span>
              <span className="route-line" aria-hidden="true" />
              <span>Chile</span>
            </div>
          </div>
          <figure className="hero-photo">
            <img
              src="/lua-de-mel/ibirapuera.jpg"
              alt="Lago e vegetação do Parque Ibirapuera, em São Paulo"
            />
            <figcaption>
              <MapPin size={15} /> Primeiro capítulo: São Paulo
            </figcaption>
          </figure>
        </section>

        <TripSwitcher />

        <section className="itinerary" id="roteiro" aria-labelledby="itinerary-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <Sparkles size={14} /> capítulo 01
              </span>
              <h2 id="itinerary-title">3 dias em São Paulo</h2>
            </div>
            <div className="summary-chips" aria-label="Informações principais">
              <span>
                <CalendarDays size={16} /> 26–28 outubro
              </span>
              <span>
                <MapPin size={16} /> Base: República
              </span>
            </div>
          </div>

          <div className="tour-grid">
            {SAO_PAULO.map((p) => (
              <PasseioCard key={p.data} p={p} />
            ))}
          </div>

          <aside className="game-note" aria-label="Informações para o dia do jogo">
            <span className="note-icon">
              <TrainFront size={24} />
            </span>
            <div>
              <span className="day-kicker">Para chegar com calma</span>
              <h3>Saída da República com 2h a 2h30 de antecedência.</h3>
              <p>
                Linha 3–Vermelha até Corinthians–Itaquera. Nesse dia, vale
                guardar energia para o jogo e deixar o tour ou o museu da arena
                para outra ocasião.
              </p>
            </div>
            <span className="note-badge">
              <CircleCheck size={15} /> plano esperto
            </span>
          </aside>
        </section>

        <section className="notes-section" aria-labelledby="notes-title">
          <div>
            <span className="eyebrow">
              <Info size={14} /> notas do roteiro
            </span>
            <h2 id="notes-title">Pequenas escolhas que deixam a viagem mais leve.</h2>
          </div>
          <div className="note-list">
            <div>
              <span>01</span>
              <p>A Paulista fica na terça porque muita coisa fecha na segunda.</p>
            </div>
            <div>
              <span>02</span>
              <p>Na chegada, o foco é deixar as malas e curtir a Liberdade sem correria.</p>
            </div>
            <div>
              <span>03</span>
              <p>Depois do Ibirapuera, uma pausa no hotel ajuda a guardar energia para o jogo.</p>
            </div>
          </div>
        </section>

        <section className="itinerary" id="chile" aria-labelledby="chile-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <Mountain size={14} /> capítulo 02
              </span>
              <h2 id="chile-title">4 dias no Chile</h2>
            </div>
            <div className="summary-chips" aria-label="Informações principais">
              <span>
                <CalendarDays size={16} /> 29 out – 01 nov
              </span>
              <span>
                <MapPin size={16} /> Base: Santiago
              </span>
            </div>
          </div>

          <div className="tour-grid">
            {CHILE.map((p) => (
              <PasseioCard key={p.data} p={p} />
            ))}
          </div>
        </section>

        <footer>
          <div className="footer-love">
            <Heart size={15} fill="currentColor" /> Patrícia & Elison • 2026
          </div>
          <div className="photo-credits">
            Fotos: Renato S. Rodrigues, Slyronit, Jorge M. Piderit, Pablo
            Acevedo (CC0), PeladínSinOlfato (CC BY-SA 3.0), Unsplash e acervo
            Wikimedia Commons.
          </div>
        </footer>
      </div>
    </main>
  );
}

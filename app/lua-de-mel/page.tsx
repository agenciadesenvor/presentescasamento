import type { Metadata } from "next";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Footprints,
  Heart,
  Info,
  MapPin,
  Mountain,
  Sparkles,
  Ticket,
  TicketsPlane,
  Wallet,
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
  /** Preço por pessoa, em reais. O valor do casal é sempre o dobro. */
  precoPessoa?: number;
  /** Passeio pago cujo valor ainda não foi decidido. */
  precoPendente?: boolean;
  agencia?: string;
  porContaPropria?: boolean;
  extra?: string;
  descricao: string;
  roteiro: Parada[];
  incluso?: string[];
};

const brl = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

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
    titulo: "Tour na Neo Química Arena + Ibirapuera",
    foto: "/lua-de-mel/arena.jpg",
    alt: "Exterior da Neo Química Arena",
    horario: "10h até a noite",
    extra: "Malas prontas: amanhã é dia de Chile",
    descricao:
      "Manhã na casa do Timão com o tour pela arena, tarde verde no Ibirapuera e a última noite em São Paulo antes do voo pro Chile.",
    roteiro: [
      "Linha 3–Vermelha até Corinthians–Itaquera",
      ["10h", "Tour na Neo Química Arena"],
      "Almoço leve na volta",
      ["Tarde", "Parque Ibirapuera: lago, Marquise e Monumento às Bandeiras"],
      ["Noite", "Jantar de despedida de SP e malas pro Chile"],
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
    titulo: "Ski Day — Valle Nevado",
    foto: "/lua-de-mel/ski-day.jpg",
    alt: "Esquiador em Valle Nevado, com os prédios da estação e os Andes nevados ao fundo",
    horario: "11h a 12h de passeio",
    precoPessoa: 258.06,
    agencia: "Bora pro Chile",
    extra: "Aluguel de roupas/equipamentos e ingresso do parque à parte",
    descricao:
      "A temporada do Valle Nevado foi prorrogada, então trocamos o sunset pelo dia de neve: endorfina e adrenalina voando sobre a neve nos Andes!",
    roteiro: [
      "Parada no rental: aluguel de roupas de neve",
      "Subida da Cordilheira dos Andes",
      "Dia de neve no Valle Nevado (dá pra trocar por El Colorado ou La Parva)",
      "Esqui, snowboard ou a primeira experiência na neve",
    ],
  },
  {
    data: "Sáb · 31/10",
    titulo: "Portillo y Laguna del Inca",
    foto: "/lua-de-mel/laguna-del-inca.jpg",
    alt: "Laguna del Inca, em Portillo, cercada pelas montanhas nevadas",
    horario: "5:00 às 15:30",
    precoPessoa: 289,
    agencia: "Elder Chile",
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
  {
    data: "Dom · 01/11",
    titulo: "Vinícola Concha y Toro",
    foto: "/lua-de-mel/concha-y-toro.jpg",
    alt: "Casona histórica da Viña Concha y Toro, em Pirque",
    horario: "Horário a definir",
    precoPendente: true,
    descricao:
      "A vinícola mais famosa do Chile, em Pirque: a casona histórica, os jardins, os vinhedos e a lendária adega do Casillero del Diablo.",
    roteiro: [
      "Casona e jardins históricos de Pirque",
      "Passeio pelos vinhedos",
      "Adega do Casillero del Diablo",
      "Degustação de vinhos",
    ],
  },
  {
    data: "Seg · 02/11",
    titulo: "Cajón del Maipo y Embalse + Termas de Colina",
    foto: "/lua-de-mel/embalse-el-yeso.jpg",
    alt: "Embalse El Yeso cercado por montanhas nevadas",
    horario: "5:00 às 18:00",
    precoPessoa: 499,
    agencia: "Elder Chile",
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
    data: "Ter · 03/11",
    titulo: "City Tour em Santiago",
    foto: "/lua-de-mel/city-tour-santiago.jpg",
    alt: "Plaza de Armas e a Catedral Metropolitana de Santiago",
    horario: "Dia inteiro",
    porContaPropria: true,
    extra: "Roteiro sugerido: ajustem como quiserem",
    descricao:
      "Um dia pra explorar Santiago no nosso ritmo: praças, palácios, mirantes e, no fim da tarde, a cidade inteira vista do alto do Cerro San Cristóbal.",
    roteiro: [
      ["Manhã", "Plaza de Armas e Catedral Metropolitana"],
      "Palacio de La Moneda e Cerro Santa Lucía",
      ["Almoço", "Bairro Lastarria ou Mercado Central"],
      ["Tarde", "Teleférico + funicular no Cerro San Cristóbal (presente da nossa lista 🤎)"],
      ["Noite", "Jantar em Bellavista, no pé do cerro"],
    ],
  },
  {
    data: "Qua · 04/11",
    titulo: "Dia livre em Santiago",
    foto: "/lua-de-mel/cordilheira-sunset.jpg",
    alt: "Pôr do sol sobre a Cordilheira dos Andes nevada",
    horario: "Em aberto",
    porContaPropria: true,
    extra: "Sem compromisso: a gente decide por lá",
    descricao:
      "Dia de sobra de propósito: repetir o lugar favorito, caçar as últimas lembrancinhas ou simplesmente não fazer nada juntos.",
    roteiro: [
      "Em aberto — vamos decidir por lá",
      "Ideias: compras, cafés e repetir o que a gente mais amou",
    ],
  },
  {
    data: "Qui · 05/11",
    titulo: "Despedida + voo de volta",
    foto: "/lua-de-mel/voo-volta.jpg",
    alt: "Asa de avião sobre as nuvens ao pôr do sol",
    horario: "Manhã livre · voo às 16h45",
    extra: "Check-out e aeroporto com antecedência",
    descricao:
      "Manhã em aberto pra última volta por Santiago e, à tarde, o voo de volta — fim do primeiro capítulo da vida de casados.",
    roteiro: [
      ["Manhã", "Livre — em aberto"],
      "Check-out e malas",
      "Transfer pro aeroporto",
      ["16h45", "Voo de volta pro Brasil"],
    ],
  },
];

const PASSEIOS_COM_VALOR_CHILE = CHILE.filter(
  (p) => p.precoPessoa !== undefined || p.precoPendente
);
const TOTAL_PESSOA_CHILE = CHILE.reduce(
  (soma, p) => soma + (p.precoPessoa ?? 0),
  0
);
const TEM_VALOR_PENDENTE_CHILE = CHILE.some((p) => p.precoPendente);

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
          {p.precoPessoa !== undefined && (
            <span className="tour-price">
              <span className="dot" aria-hidden="true" />
              <strong>{brl(p.precoPessoa)}/pessoa</strong>
            </span>
          )}
          {p.precoPendente && (
            <span className="tour-price">
              <span className="dot" aria-hidden="true" />
              <em className="tour-pending">Valor a definir</em>
            </span>
          )}
        </div>
        {(p.precoPessoa !== undefined || p.precoPendente) && (
          <div className="tour-couple">
            <span>
              <Heart size={14} fill="currentColor" aria-hidden="true" /> Valor do
              casal
            </span>
            {p.precoPessoa !== undefined ? (
              <strong>{brl(p.precoPessoa * 2)}</strong>
            ) : (
              <strong className="pending">a definir</strong>
            )}
          </div>
        )}
        {p.porContaPropria && (
          <span className="tour-agency">
            <span className="tour-agency-icon">
              <Footprints size={15} aria-hidden="true" />
            </span>
            <span>
              Passeio <strong>por conta própria</strong>
            </span>
          </span>
        )}
        {p.agencia && (
          <span className="tour-agency">
            <span className="tour-agency-icon">
              <TicketsPlane size={15} aria-hidden="true" />
            </span>
            <span>
              Passeio com <strong>{p.agencia}</strong>
            </span>
          </span>
        )}
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
        <a className="brand" href="#roteiro" aria-label="Voltar ao início">
          <span className="brand-mark">
            P<span>&</span>E
          </span>
          <span className="brand-copy">
            Patrícia & Elison<small>lua de mel • 2026</small>
          </span>
        </a>
        <a className="header-pill" href="#roteiro">
          <CalendarDays size={17} aria-hidden="true" /> 26 out – 05 nov
        </a>
      </header>

      <div className="page-shell">
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
              <p>Na última noite em SP, malas prontas: o voo pro Chile sai no dia 29.</p>
            </div>
          </div>
        </section>

        <section className="itinerary" id="chile" aria-labelledby="chile-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <Mountain size={14} /> capítulo 02
              </span>
              <h2 id="chile-title">{CHILE.length} dias no Chile</h2>
            </div>
            <div className="summary-chips" aria-label="Informações principais">
              <span>
                <CalendarDays size={16} /> 29 out – 05 nov
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

        <section className="itinerary budget" id="valores" aria-labelledby="valores-title">
          <div className="budget-card">
            <div className="budget-head">
              <span className="eyebrow">
                <Wallet size={14} /> valores
              </span>
              <h2 id="valores-title">Passeios no Chile</h2>
              <p>O valor de cada passeio por pessoa e o total pra nós dois.</p>
            </div>

            <div className="budget-rows">
              {PASSEIOS_COM_VALOR_CHILE.map((p) => (
                <div className="budget-row" key={p.data}>
                  <div className="budget-info">
                    <span className="budget-date">{p.data}</span>
                    <strong>{p.titulo}</strong>
                    {p.agencia && <small>{p.agencia}</small>}
                  </div>
                  {p.precoPessoa !== undefined ? (
                    <div className="budget-values">
                      <span>{brl(p.precoPessoa)}/pessoa</span>
                      <strong>{brl(p.precoPessoa * 2)}</strong>
                    </div>
                  ) : (
                    <div className="budget-values">
                      <span>por pessoa: a definir</span>
                      <strong className="pending">a definir</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="budget-total">
              <div>
                <span>
                  <Heart size={15} fill="currentColor" aria-hidden="true" /> Total do
                  casal
                </span>
                <small>{brl(TOTAL_PESSOA_CHILE)} por pessoa</small>
                {TEM_VALOR_PENDENTE_CHILE && (
                  <small className="budget-note">
                    + passeios com valor a definir
                  </small>
                )}
              </div>
              <strong>{brl(TOTAL_PESSOA_CHILE * 2)}</strong>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-love">
            <Heart size={15} fill="currentColor" /> Patrícia & Elison • 2026
          </div>
          <div className="photo-credits">
            Fotos: Renato S. Rodrigues, Slyronit, Jorge M. Piderit, Pablo
            Acevedo (CC0), PeladínSinOlfato (CC BY-SA 3.0), Sfs90 (CC BY-SA 4.0),
            Apincheira (CC BY-SA 3.0), Bora pro Chile, Unsplash e acervo
            Wikimedia Commons.
          </div>
        </footer>
      </div>
    </main>
  );
}

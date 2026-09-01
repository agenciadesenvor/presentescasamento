import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarDays,
  CircleCheck,
  Clock3,
  Coffee,
  Heart,
  Info,
  Landmark,
  MapPin,
  Mountain,
  Plane,
  Sparkles,
  TrainFront,
  Trees,
} from "lucide-react";
import "./lua-de-mel.css";

// Página privada do casal (design criado por eles no Codex e portado pra cá):
// sem link em lugar nenhum do site e fora dos buscadores.
export const metadata: Metadata = {
  title: "Nossa Lua de Mel | Patrícia & Elison",
  description: "O roteiro de lua de mel de Patrícia e Elison por São Paulo e Chile.",
  robots: { index: false, follow: false },
};

const liberdadeStops = [
  ["07h25", "Chegada em Guarulhos", "Desembarque, trajeto até a República e malas no hotel."],
  ["Manhã", "Liberdade sem pressa", "Brunch no Café Station, Praça da Liberdade e Rua Galvão Bueno."],
  ["15h", "Check-in e pausa", "Volta ao hotel para entrar no quarto e descansar."],
  ["Noite", "Jantar pertinho", "República ou Santa Cecília, num ritmo leve para fechar o primeiro dia."],
];

const centroStops = [
  ["Manhã", "Centro histórico", "Theatro Municipal, Viaduto do Chá, Mosteiro de São Bento e Farol Santander."],
  ["Almoço", "Sabores do Centro", "Escolher entre os restaurantes do Centro ou o Mercado Municipal."],
  ["Tarde", "Paulista + MASP", "Passeio pela avenida e visita ao museu no ritmo de vocês."],
  ["Noite", "Jantar e descanso", "Paulista/Jardins ou retorno para a República."],
];

const ibirapueraStops = [
  ["Manhã", "Ibirapuera", "Lago, Marquise, Monumento às Bandeiras e entorno do Auditório."],
  ["Almoço", "Pausa leve", "Comer sem pressa e voltar ao hotel para descansar."],
  ["Fim da tarde", "Rumo a Itaquera", "Linha 3–Vermelha até a estação Corinthians–Itaquera."],
  ["Noite", "Corinthians x Mirassol", "Neo Química Arena para fechar São Paulo em clima de jogo."],
];

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
          <CalendarDays size={17} aria-hidden="true" /> 26–28 out
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

        <nav className="trip-switcher" aria-label="Capítulos da viagem">
          <a className="trip-tab active" href="#roteiro">
            São Paulo <small>26–28 out</small>
          </a>
          <a className="trip-tab soon" href="#chile">
            Chile <small>em breve</small>
          </a>
        </nav>

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

          <article className="day-card featured">
            <div className="day-photo">
              <img
                src="/lua-de-mel/liberdade.jpg"
                alt="Rua do bairro da Liberdade decorada com lanternas orientais"
              />
              <span className="photo-label">Liberdade</span>
            </div>
            <div className="day-content">
              <div className="day-topline">
                <div>
                  <span className="day-kicker">Dia 1 • segunda, 26/10</span>
                  <h3>Chegada + Liberdade</h3>
                </div>
                <span className="day-icon">
                  <Coffee size={22} />
                </span>
              </div>
              <div className="timeline">
                {liberdadeStops.map(([time, title, description]) => (
                  <div className="timeline-row" key={time + title}>
                    <span className="timeline-time">
                      <Clock3 size={14} /> {time}
                    </span>
                    <div>
                      <h4>{title}</h4>
                      <p>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="day-grid">
            <article className="day-card compact">
              <div className="day-photo">
                <img
                  src="/lua-de-mel/paulista.jpg"
                  alt="MASP e movimento na Avenida Paulista"
                />
                <span className="photo-label">Centro + Paulista</span>
              </div>
              <div className="day-content">
                <div className="day-topline">
                  <div>
                    <span className="day-kicker">Dia 2 • terça, 27/10</span>
                    <h3>Centro histórico + Paulista</h3>
                  </div>
                  <span className="day-icon">
                    <Landmark size={22} />
                  </span>
                </div>
                <div className="timeline">
                  {centroStops.map(([time, title, description]) => (
                    <div className="timeline-row" key={time + title}>
                      <span className="timeline-time">
                        <Clock3 size={14} /> {time}
                      </span>
                      <div>
                        <h4>{title}</h4>
                        <p>{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className="day-card compact">
              <div className="day-photo arena-photo">
                <img
                  src="/lua-de-mel/arena.jpg"
                  alt="Exterior da Neo Química Arena iluminado à noite"
                />
                <span className="photo-label">Ibirapuera + Arena</span>
              </div>
              <div className="day-content">
                <div className="day-topline">
                  <div>
                    <span className="day-kicker">Dia 3 • quarta, 28/10</span>
                    <h3>Ibirapuera + Corinthians</h3>
                  </div>
                  <span className="day-icon">
                    <Trees size={22} />
                  </span>
                </div>
                <div className="timeline">
                  {ibirapueraStops.map(([time, title, description]) => (
                    <div className="timeline-row" key={time + title}>
                      <span className="timeline-time">
                        <Clock3 size={14} /> {time}
                      </span>
                      <div>
                        <h4>{title}</h4>
                        <p>{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
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

        <section className="chile-card" id="chile" aria-labelledby="chile-title">
          <div>
            <span className="eyebrow">
              <Mountain size={14} /> capítulo 02
            </span>
            <h2 id="chile-title">Chile, nossa próxima paisagem.</h2>
            <p>
              Este capítulo já tem lugar reservado. Assim que vocês definirem
              datas, cidades e passeios, ele entra aqui com o mesmo cuidado.
            </p>
            <span className="coming-soon">
              Roteiro em construção <ArrowRight size={16} />
            </span>
          </div>
          <div className="chile-stamp" aria-hidden="true">
            <Mountain size={54} strokeWidth={1.3} />
            <span>
              próximo
              <br />
              destino
            </span>
          </div>
        </section>

        <footer>
          <div className="footer-love">
            <Heart size={15} fill="currentColor" /> Patrícia & Elison • 2026
          </div>
          <div className="photo-credits">
            Fotos: Renato S. Rodrigues, Slyronit, Jorge M. Piderit e acervo
            Wikimedia Commons.
          </div>
        </footer>
      </div>
    </main>
  );
}

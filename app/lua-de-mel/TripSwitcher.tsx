"use client";

import { useEffect, useState } from "react";

const CAPITULOS = [
  { id: "roteiro", nome: "São Paulo", datas: "26–28 out" },
  { id: "chile", nome: "Chile", datas: "29 out – 03 nov" },
  { id: "valores", nome: "Valores", datas: "Chile" },
];

/** Abas fixas dos capítulos; a ativa acompanha a seção visível na tela. */
export default function TripSwitcher() {
  const [ativo, setAtivo] = useState(CAPITULOS[0].id);

  useEffect(() => {
    // Ativo = último capítulo cujo topo já passou por baixo da barra fixa;
    // acima de todos (hero), fica o primeiro.
    const atualizar = () => {
      let atual = CAPITULOS[0].id;
      for (const c of CAPITULOS) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= 140) atual = c.id;
      }
      // A última seção é curta e pode nunca subir até a barra: no fim da página, ela vale.
      const noFim =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (noFim) atual = CAPITULOS[CAPITULOS.length - 1].id;
      setAtivo(atual);
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("hashchange", atualizar);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("hashchange", atualizar);
    };
  }, []);

  return (
    <nav className="trip-switcher" aria-label="Capítulos da viagem">
      {CAPITULOS.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={`trip-tab${ativo === c.id ? " active" : ""}`}
          aria-current={ativo === c.id ? "true" : undefined}
          onClick={() => setAtivo(c.id)}
        >
          {c.nome} <small>{c.datas}</small>
        </a>
      ))}
    </nav>
  );
}

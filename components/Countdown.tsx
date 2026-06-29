"use client";

import { useEffect, useState } from "react";

type Remaining = { d: number; h: number; m: number; s: number; done: boolean };

function getRemaining(targetMs: number): Remaining {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff % 86_400_000) / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1_000),
    done: diff === 0,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Contagem regressiva até `target` (ISO com fuso, ex.: 2026-10-23T16:00:00-03:00). */
export default function Countdown({ target }: { target: string }) {
  const targetMs = new Date(target).getTime();
  const [t, setT] = useState<Remaining | null>(null);

  useEffect(() => {
    setT(getRemaining(targetMs));
    const id = setInterval(() => setT(getRemaining(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (t?.done) {
    return (
      <p className="font-serif text-xl text-forest-600">
        🎉 Hoje é o grande dia!
      </p>
    );
  }

  const items = [
    { value: t ? t.d : 0, label: "dias" },
    { value: t ? pad(t.h) : "00", label: "horas" },
    { value: t ? pad(t.m) : "00", label: "min" },
    { value: t ? pad(t.s) : "00", label: "seg" },
  ];

  return (
    <div className="flex items-stretch gap-2 sm:gap-3" aria-label="Contagem regressiva para o casamento">
      {items.map((it, i) => (
        <div
          key={i}
          className="flex min-w-[60px] flex-col items-center rounded-xl2 border border-cream-200 bg-white px-3 py-2 shadow-card sm:min-w-[72px] sm:px-4 sm:py-3"
        >
          <span className="font-serif text-2xl tabular-nums text-forest-600 sm:text-3xl">
            {it.value}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-muted">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  );
}

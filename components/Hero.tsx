import Image from "next/image";
import type { Settings } from "@/lib/types";

function formatWeddingDate(date: string | null): string | null {
  if (!date) return null;
  const d = new Date(date + "T12:00:00");
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Hero({ settings }: { settings: Settings }) {
  const dateLabel = formatWeddingDate(settings.weddingDate);

  return (
    <header className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      {/* Foto de fundo do casal */}
      <Image
        src="/hero-casal.jpg"
        alt={settings.coupleNames}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_55%]"
      />

      {/* Leve gradiente para dar leitura à logo branca */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Logo + nomes + data + CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <img
          src="/hero-monograma.svg"
          alt={`${settings.coupleNames} — monograma`}
          className="w-[240px] drop-shadow-[0_2px_16px_rgba(0,0,0,0.3)] sm:w-[320px] md:w-[380px]"
        />

        {dateLabel && (
          <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-white/90 sm:mt-7 sm:text-sm">
            {dateLabel} · 16h
          </p>
        )}

        <a
          href="#presentes"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white hover:text-forest-700"
        >
          🎁 Ver a lista de presentes
        </a>
      </div>

      {/* Seta de scroll */}
      <a
        href="#presentes"
        aria-label="Ver presentes"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 transition hover:text-white"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="animate-bounce">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </header>
  );
}

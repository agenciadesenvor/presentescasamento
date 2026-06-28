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
    <header className="relative overflow-hidden">
      {/* Fundo suave da paleta */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-50 via-cream to-cream" />

      <div className="container-page flex flex-col items-center py-16 text-center sm:py-20">
        {/* Logo do casamento */}
        <Image
          src="/logo.svg"
          alt={`Logo de ${settings.coupleNames}`}
          width={150}
          height={117}
          priority
          unoptimized
          className="h-24 w-auto sm:h-28"
        />

        <span className="pill mt-7 border border-forest-200 bg-white/70 text-forest-700 backdrop-blur">
          {dateLabel ? `Vamos casar em ${dateLabel}` : "Vamos casar!"}
        </span>

        <h1 className="mt-5 font-serif text-4xl leading-tight text-forest-700 sm:text-6xl">
          {settings.coupleNames}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {settings.heroTagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#presentes" className="btn-primary">
            🎁 Ver a lista de presentes
          </a>
        </div>
      </div>
    </header>
  );
}

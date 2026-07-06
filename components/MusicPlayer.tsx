"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Music, Pause } from "lucide-react";

/** Botão flutuante que toca "a nossa música" em loop (começa ao clicar). */
export default function MusicPlayer() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // Não mostra no painel admin.
  if (pathname?.startsWith("/admin")) return null;

  async function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
      } catch {
        /* navegador bloqueou — ignora */
      }
    } else {
      a.pause();
    }
  }

  return (
    <div className="fixed bottom-5 left-4 z-40 sm:left-5">
      <audio
        ref={audioRef}
        src="/music/nossa-musica.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar nossa música" : "Tocar nossa música"}
        className="group flex items-center gap-2 rounded-full border border-cream-200 bg-white/90 py-1.5 pl-1.5 pr-3 shadow-card backdrop-blur transition hover:shadow-cardHover"
      >
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-forest-600 text-white">
          {playing ? <Pause size={16} /> : <Music size={16} />}
          {playing && (
            <span className="absolute inset-0 animate-ping rounded-full bg-forest-500/40" />
          )}
        </span>
        <span className="text-xs font-medium text-ink">
          {playing ? "Tocando 🎵" : "Nossa música"}
        </span>
      </button>
    </div>
  );
}

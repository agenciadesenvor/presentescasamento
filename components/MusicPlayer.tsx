"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Music, Pause, SkipForward } from "lucide-react";

const tracks = [
  { title: "The Scientist", src: "/music/the-scientist.mp3" },
  { title: "Marry You", src: "/music/marry-you.mp3" },
  { title: "Lifetime", src: "/music/lifetime.mp3" },
  { title: "A Tu Lado", src: "/music/a-tu-lado.mp3" },
];

/** Mini-player flutuante com a playlist do casal. Tenta autoplay ao abrir; se
 *  o navegador bloquear (padrão em quase todos), começa no primeiro clique/scroll. */
export default function MusicPlayer() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement>(null);
  const wantPlay = useRef(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Autoplay ao abrir o site (com fallback no primeiro gesto do usuário).
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    const start = () => {
      a.play().catch(() => {});
      events.forEach((e) => window.removeEventListener(e, start));
    };
    a.play().catch(() => {
      // navegador bloqueou o som automático → toca no primeiro gesto
      events.forEach((e) =>
        window.addEventListener(e, start, { passive: true })
      );
    });
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, []);

  // Ao trocar de faixa, toca automaticamente se estávamos ouvindo.
  useEffect(() => {
    const a = audioRef.current;
    if (a && wantPlay.current) {
      a.play().catch(() => {});
      wantPlay.current = false;
    }
  }, [current]);

  // Não mostra no painel admin.
  if (pathname?.startsWith("/admin")) return null;

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  }

  function next() {
    wantPlay.current = true;
    setCurrent((c) => (c + 1) % tracks.length);
  }

  return (
    <div className="pointer-events-none fixed bottom-5 left-4 z-40 sm:left-5">
      <audio
        ref={audioRef}
        src={tracks[current].src}
        preload="metadata"
        onEnded={next}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-cream-200 bg-white/90 p-1.5 shadow-card backdrop-blur">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar música" : "Tocar nossa música"}
          className="relative grid h-9 w-9 place-items-center rounded-full bg-forest-600 text-white transition hover:bg-forest-700"
        >
          {playing ? <Pause size={16} /> : <Music size={16} />}
          {playing && (
            <span className="absolute inset-0 animate-ping rounded-full bg-forest-500/40" />
          )}
        </button>
        <span className="max-w-[104px] truncate px-1 text-xs font-medium text-ink">
          {playing ? "♪ " : ""}
          {tracks[current].title}
        </span>
        <button
          type="button"
          onClick={next}
          aria-label="Próxima música"
          className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-cream-100 hover:text-forest-600"
        >
          <SkipForward size={15} />
        </button>
      </div>
    </div>
  );
}

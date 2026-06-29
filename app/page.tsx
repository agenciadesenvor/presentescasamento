import Hero from "@/components/Hero";
import GiftGrid from "@/components/GiftGrid";
import Countdown from "@/components/Countdown";
import { getGifts, getSettings } from "@/lib/data/gifts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [gifts, settings] = await Promise.all([getGifts(), getSettings()]);

  return (
    <main className="min-h-screen">
      <Hero settings={settings} />

      <div className="container-page pt-14 pb-12 text-center sm:pt-20 sm:pb-16">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">
          Escolha uma cota e faça parte da festa 🎉
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted sm:text-base">
          Tem presente sério e tem cota divertida. Cada uma vem com um espaço
          pra você deixar um recadinho que a gente vai guardar pra sempre.
        </p>
      </div>

      <GiftGrid gifts={gifts} />

      <footer className="border-t border-cream-200 bg-cream-50">
        <div className="container-page flex flex-col items-center gap-4 py-12 text-center">
          <p className="font-serif text-2xl text-ink">{settings.coupleNames}</p>
          <p className="text-sm text-muted">Contagem regressiva para o grande dia 🤎</p>
          <Countdown target="2026-10-23T16:00:00-03:00" />
          <p className="text-xs uppercase tracking-wide text-muted">
            23 de outubro de 2026 · 16h
          </p>
          <p className="mt-3 text-sm text-muted">
            Obrigado por fazer parte da nossa história. 🤎
          </p>
        </div>
      </footer>
    </main>
  );
}

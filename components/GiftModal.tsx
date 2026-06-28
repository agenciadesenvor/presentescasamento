"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import GiftImage from "./GiftImage";
import PurchaseForm from "./PurchaseForm";
import {
  CATEGORY_EMOJI,
  CATEGORY_LABELS,
  type Gift,
} from "@/lib/types";

export default function GiftModal({
  gift,
  onClose,
}: {
  gift: Gift | null;
  onClose: () => void;
}) {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    setActivePhoto(0);
  }, [gift]);

  useEffect(() => {
    if (!gift) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [gift, onClose]);

  if (!gift) return null;

  const photos = gift.photos.length ? gift.photos : [undefined];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-cream shadow-cardHover animate-fade-in-up sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur transition hover:scale-105"
        >
          <X size={18} />
        </button>

        <div className="grid overflow-y-auto md:grid-cols-2">
          {/* Galeria */}
          <div className="flex flex-col gap-3 bg-cream-50 p-4 sm:p-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card">
              <GiftImage
                src={photos[activePhoto]}
                category={gift.category}
                alt={gift.title}
                className="h-full w-full"
                emojiClassName="text-8xl"
                priority
              />
            </div>
            {photos.length > 1 && (
              <div className="flex gap-2">
                {photos.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhoto(i)}
                    className={`relative aspect-square w-16 overflow-hidden rounded-xl border-2 transition ${
                      i === activePhoto
                        ? "border-forest-500"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <GiftImage
                      src={p}
                      category={gift.category}
                      alt={`${gift.title} ${i + 1}`}
                      className="h-full w-full"
                      emojiClassName="text-2xl"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detalhes + compra */}
          <div className="flex flex-col gap-4 p-4 sm:p-6">
            <div>
              <span className="pill bg-mocha-100 text-mocha-500">
                {CATEGORY_EMOJI[gift.category]} {CATEGORY_LABELS[gift.category]}
                {gift.isFun && " · ✨ divertida"}
              </span>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                {gift.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {gift.description}
              </p>
            </div>

            <PurchaseForm gift={gift} />
          </div>
        </div>
      </div>
    </div>
  );
}

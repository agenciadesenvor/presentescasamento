"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import GiftImage from "./GiftImage";
import {
  CATEGORY_EMOJI,
  CATEGORY_LABELS,
  cotasLeft,
  formatBRL,
  type Gift,
} from "@/lib/types";

export default function GiftCard({
  gift,
  onOpen,
}: {
  gift: Gift;
  onOpen: (gift: Gift) => void;
}) {
  const [fav, setFav] = useState(false);
  const left = cotasLeft(gift);
  const soldOut = left <= 0;

  return (
    <button
      type="button"
      onClick={() => onOpen(gift)}
      className="group flex flex-col text-left focus:outline-none"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 shadow-card transition group-hover:shadow-cardHover">
        <GiftImage
          src={gift.photos[0]}
          category={gift.category}
          alt={gift.title}
          className="h-full w-full transition duration-500 group-hover:scale-[1.04]"
        />

        {/* Selo de categoria */}
        <span className="pill absolute left-3 top-3 bg-white/90 text-ink backdrop-blur">
          {CATEGORY_EMOJI[gift.category]} {CATEGORY_LABELS[gift.category]}
        </span>

        {/* Selo divertido */}
        {gift.isFun && (
          <span className="pill absolute right-12 top-3 bg-forest-500 text-white">
            ✨ cota divertida
          </span>
        )}

        {/* Favoritar */}
        <span
          role="button"
          tabIndex={-1}
          aria-label="Favoritar"
          onClick={(e) => {
            e.stopPropagation();
            setFav((v) => !v);
          }}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/80 backdrop-blur transition hover:scale-110"
        >
          <Heart
            size={18}
            className={
              fav ? "fill-forest-500 text-forest-500" : "text-ink/70"
            }
          />
        </span>

        {soldOut && (
          <div className="absolute inset-0 grid place-items-center bg-ink/45">
            <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink">
              🎉 Tudo presenteado!
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="font-serif text-lg leading-snug text-ink">
          {gift.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-sm text-muted">
          {gift.description}
        </p>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-semibold text-ink">
            {formatBRL(gift.cotaPrice)}
          </span>
          <span className="text-sm text-muted">· a cota</span>
        </div>
        {!soldOut && (
          <p className="mt-0.5 text-xs text-muted">
            {left} {left === 1 ? "cota disponível" : "cotas disponíveis"}
          </p>
        )}
      </div>
    </button>
  );
}

import Image from "next/image";
import type { Category } from "@/lib/types";

const GRADIENTS: Record<Category, string> = {
  divertidas: "from-mocha-200 via-mocha-300 to-mocha-500",
  casa: "from-forest-200 via-forest-300 to-forest-500",
  cozinha: "from-cream-200 via-mocha-200 to-mocha-400",
  lua_de_mel: "from-forest-200 via-stone-300 to-forest-400",
};

type Props = {
  src?: string;
  category: Category;
  alt: string;
  className?: string;
  emojiClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renderiza uma foto real (URL) ou, quando a fonte é "emoji:🍹", um gradiente
 * divertido com o emoji centralizado. O contêiner pai define a proporção.
 */
export default function GiftImage({
  src,
  category,
  alt,
  className = "",
  emojiClassName = "text-6xl sm:text-7xl",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: Props) {
  const isEmoji = !src || src.startsWith("emoji:");

  if (isEmoji) {
    const emoji = src ? src.slice("emoji:".length) : "🎁";
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br ${GRADIENTS[category]} ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className={`${emojiClassName} drop-shadow-sm select-none`}>
          {emoji}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}

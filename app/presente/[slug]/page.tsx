import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GiftImage from "@/components/GiftImage";
import PurchaseForm from "@/components/PurchaseForm";
import {
  CATEGORY_EMOJI,
  CATEGORY_LABELS,
  cotasLeft,
  formatBRL,
} from "@/lib/types";
import { getGiftBySlug } from "@/lib/data/gifts";

export const dynamic = "force-dynamic";

export default async function GiftPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gift = await getGiftBySlug(slug);
  if (!gift) notFound();

  const left = cotasLeft(gift);

  return (
    <main className="min-h-screen">
      <div className="container-page py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-forest-600"
        >
          <ArrowLeft size={16} /> Voltar para a lista
        </Link>
      </div>

      <div className="container-page grid gap-8 pb-24 md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-card">
          <GiftImage
            src={gift.photos[0]}
            category={gift.category}
            alt={gift.title}
            className="h-full w-full"
            emojiClassName="text-9xl"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="pill w-fit bg-mocha-100 text-mocha-500">
            {CATEGORY_EMOJI[gift.category]} {CATEGORY_LABELS[gift.category]}
            {gift.isFun && " · ✨ divertida"}
          </span>
          <h1 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
            {gift.title}
          </h1>
          <p className="text-muted">{gift.description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-ink">
              {formatBRL(gift.cotaPrice)}
            </span>
            <span className="text-muted">por cota</span>
            {left > 0 && (
              <span className="text-sm text-muted">
                · {left} disponíveis
              </span>
            )}
          </div>

          <div className="mt-2">
            <PurchaseForm gift={gift} />
          </div>
        </div>
      </div>
    </main>
  );
}

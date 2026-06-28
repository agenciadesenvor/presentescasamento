"use client";

import { useMemo, useState } from "react";
import GiftCard from "./GiftCard";
import GiftModal from "./GiftModal";
import CategoryFilter, { type FilterValue } from "./CategoryFilter";
import { CATEGORY_ORDER, type Gift } from "@/lib/types";

export default function GiftGrid({ gifts }: { gifts: Gift[] }) {
  const [filter, setFilter] = useState<FilterValue>("todos");
  const [selected, setSelected] = useState<Gift | null>(null);

  const counts = useMemo(() => {
    const c: Record<FilterValue, number> = {
      todos: gifts.length,
      divertidas: 0,
      casa: 0,
      cozinha: 0,
      lua_de_mel: 0,
    };
    for (const g of gifts) c[g.category] += 1;
    return c;
  }, [gifts]);

  const visible = useMemo(
    () =>
      filter === "todos" ? gifts : gifts.filter((g) => g.category === filter),
    [gifts, filter]
  );

  // Mantém uma ordem agradável: divertidas primeiro quando em "todos"
  const ordered = useMemo(() => {
    if (filter !== "todos") return visible;
    return [...visible].sort((a, b) => {
      const ca = CATEGORY_ORDER.indexOf(a.category);
      const cb = CATEGORY_ORDER.indexOf(b.category);
      if (ca !== cb) return ca - cb;
      return a.sortOrder - b.sortOrder;
    });
  }, [visible, filter]);

  return (
    <section id="presentes" className="container-page pb-24">
      <CategoryFilter value={filter} onChange={setFilter} counts={counts} />

      <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((gift) => (
          <GiftCard key={gift.id} gift={gift} onOpen={setSelected} />
        ))}
      </div>

      {ordered.length === 0 && (
        <p className="py-16 text-center text-muted">
          Nenhum presente nesta categoria ainda. 💛
        </p>
      )}

      <GiftModal gift={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

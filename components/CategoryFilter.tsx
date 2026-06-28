"use client";

import {
  CATEGORY_EMOJI,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type Category,
} from "@/lib/types";

export type FilterValue = Category | "todos";

export default function CategoryFilter({
  value,
  onChange,
  counts,
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
}) {
  const items: { key: FilterValue; label: string; emoji: string }[] = [
    { key: "todos", label: "Tudo", emoji: "💛" },
    ...CATEGORY_ORDER.map((c) => ({
      key: c,
      label: CATEGORY_LABELS[c],
      emoji: CATEGORY_EMOJI[c],
    })),
  ];

  return (
    <div className="sticky top-0 z-20 -mx-4 border-b border-cream-200 bg-cream/85 px-4 backdrop-blur sm:-mx-6 sm:px-6">
      <div className="no-scrollbar flex gap-2 overflow-x-auto py-3">
        {items.map((it) => {
          const active = it.key === value;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onChange(it.key)}
              className={`pill border px-4 py-2 text-sm transition ${
                active
                  ? "border-forest-500 bg-forest-500 text-white shadow-sm"
                  : "border-cream-200 bg-white text-ink hover:border-forest-300"
              }`}
            >
              <span>{it.emoji}</span>
              <span>{it.label}</span>
              <span
                className={active ? "text-white/80" : "text-muted"}
              >
                {counts[it.key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

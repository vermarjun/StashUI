"use client";

import ShapeHero from "@/registry/kokonut-ui/shape-hero";

export default function ShapeHeroDemo() {
  return (
    <ShapeHero
      className="min-h-[720px]"
      eyebrow={
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          <span className="size-1.5 rounded-full bg-orange-500" />
          40 new physics components
        </span>
      }
    />
  );
}

"use client";

import DrapeBackground from "@/registry/kokonut-ui/drape-background";

export default function DrapeBackgroundDemo() {
  return (
    <DrapeBackground className="min-h-[640px]">
      <div className="pointer-events-none relative z-10 flex max-w-xl flex-col items-center gap-4 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
          Autumn / Winter 2026
        </p>
        <h1 className="text-balance font-semibold text-5xl tracking-tight sm:text-6xl">
          Behind the curtain
        </h1>
        <p className="text-balance text-zinc-600 dark:text-zinc-400">
          Push the cloth aside. It sways back on its own.
        </p>
      </div>
    </DrapeBackground>
  );
}

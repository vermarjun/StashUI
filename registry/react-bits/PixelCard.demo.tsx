"use client";

import PixelCard from "@/registry/react-bits/PixelCard";

const CARDS = [
  { variant: "default" as const, title: "Default", sub: "Neutral pixels" },
  { variant: "blue" as const, title: "Blue", sub: "Cool tones" },
  { variant: "pink" as const, title: "Pink", sub: "Warm glow" },
];

export default function Demo() {
  return (
    <div className="flex min-h-[520px] w-full flex-wrap items-center justify-center gap-6 p-8">
      {CARDS.map((c) => (
        <PixelCard className="h-[360px] w-[260px] bg-card" key={c.variant} variant={c.variant}>
          <div className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center gap-1">
            <span className="font-semibold text-foreground text-xl tracking-tight">{c.title}</span>
            <span className="text-muted-foreground text-sm">{c.sub}</span>
            <span className="mt-4 rounded-full border border-border px-3 py-1 text-muted-foreground text-xs">
              Hover me
            </span>
          </div>
        </PixelCard>
      ))}
    </div>
  );
}

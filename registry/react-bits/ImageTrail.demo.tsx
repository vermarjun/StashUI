"use client";

import ImageTrail from "@/registry/react-bits/ImageTrail";

const ITEMS = [
  "https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?w=400&h=440&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1603338936206-9f7bd3c61cf0?w=400&h=440&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1761775915848-467e41c1c4db?w=400&h=440&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=440&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=440&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1726824766931-4bd8b59af37c?w=400&h=440&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1516705486637-7b01bf9b9d13?w=400&h=440&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1718603630685-d2605d5190e8?w=400&h=440&fit=crop&auto=format&q=80",
];

export default function Demo() {
  return (
    <div className="relative h-[520px] w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-muted/20">
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 select-none">
        <span className="text-[clamp(3rem,9vw,7rem)] leading-none font-black tracking-tighter text-foreground/90">
          Image Trail
        </span>
        <span className="text-sm text-muted-foreground">
          Move your cursor across the canvas
        </span>
      </div>
      <ImageTrail key="trail" items={ITEMS} variant={1} />
    </div>
  );
}

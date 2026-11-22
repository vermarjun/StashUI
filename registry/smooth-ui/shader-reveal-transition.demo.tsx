"use client";

import { useState } from "react";
import ShaderRevealTransition, {
  type ShaderRevealVariant,
} from "./shader-reveal-transition";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    kicker: "Dolomites, Italy",
    title: "Above the cloud line",
  },
  {
    image:
      "https://images.unsplash.com/photo-1478028928718-7bfdb1b32095?w=1200&q=80",
    kicker: "Lofoten, Norway",
    title: "Night shift at the fjord",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=1200&q=80",
    kicker: "Patagonia, Chile",
    title: "Wind from the south",
  },
];

const VARIANTS: ShaderRevealVariant[] = [
  "noise",
  "wipe",
  "circle",
  "stripes",
  "zoom",
  "luma",
  "planetary",
  "push",
];

export default function ShaderRevealTransitionDemo() {
  const [index, setIndex] = useState(0);
  const [variant, setVariant] = useState<ShaderRevealVariant>("noise");
  const slide = SLIDES[index % SLIDES.length];

  return (
    <div className="flex w-full max-w-3xl flex-col items-center gap-5 p-6">
      <ShaderRevealTransition
        className="aspect-[16/9] w-full border border-border"
        transitionKey={index}
        variant={variant}
      >
        <div className="relative aspect-[16/9] w-full">
          <img
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
            src={slide.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xs uppercase tracking-[0.2em] opacity-75">
              {slide.kicker}
            </p>
            <h3 className="mt-1 font-semibold text-3xl">{slide.title}</h3>
          </div>
        </div>
      </ShaderRevealTransition>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {VARIANTS.map((v) => (
          <button
            className={`rounded-full border px-3 py-1 text-xs capitalize transition-colors ${
              v === variant
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
            key={v}
            onClick={() => setVariant(v)}
            type="button"
          >
            {v}
          </button>
        ))}
        <button
          className="ml-2 rounded-full bg-foreground px-4 py-1.5 font-medium text-background text-sm"
          onClick={() => setIndex((i) => i + 1)}
          type="button"
        >
          Next scene
        </button>
      </div>
    </div>
  );
}

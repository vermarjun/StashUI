"use client";

import { ImageGenerationLoader } from "./image-generation-loader";

const tiles = [
  {
    prompt: "Alpine ridge at golden hour, volumetric light",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    effect: "shimmer" as const,
    colors: ["#93c5fd", "#2563eb"] as const,
    text: "Generating",
    duration: 4200,
  },
  {
    prompt: "Neon city street after rain, cinematic",
    src: "https://images.unsplash.com/photo-1478028928718-7bfdb1b32095?w=1200&q=80",
    effect: "wave" as const,
    colors: ["#f9a8d4", "#db2777"] as const,
    text: undefined,
    duration: 3600,
  },
  {
    prompt: "Portrait, soft window light, 85mm",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80",
    effect: "scale-wave" as const,
    colors: ["#6ee7b7", "#059669"] as const,
    text: undefined,
    duration: 4800,
  },
];

export default function ImageGenerationLoaderDemo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-8">
      <div className="grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        {tiles.map((tile) => (
          <figure
            key={tile.prompt}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <img
                src={tile.src}
                alt={tile.prompt}
                className="absolute inset-0 size-full object-cover"
              />
              <ImageGenerationLoader
                effect={tile.effect}
                colors={tile.colors}
                text={tile.text}
                duration={tile.duration}
                overlayOpacity={0.45}
              />
            </div>
            <figcaption className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
              <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-foreground/70" />
              <span className="truncate">{tile.prompt}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

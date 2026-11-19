"use client";

import PixelTransition from "@/registry/react-bits/PixelTransition";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <PixelTransition
        firstContent={
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop&auto=format&q=80"
            alt="Mountain range at dawn"
            className="h-full w-full object-cover"
          />
        }
        secondContent={
          <div className="flex h-full w-full flex-col justify-between bg-neutral-950 p-7 text-left">
            <span className="w-fit rounded-full border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/70">
              Trek · 6 days
            </span>
            <div>
              <p className="text-4xl font-bold leading-tight text-white">Dolomites High Route</p>
              <p className="mt-3 text-sm text-white/60">
                72 km · 4,100 m climb · huts included
              </p>
              <p className="mt-6 text-2xl font-semibold text-white">
                from $1,240
              </p>
            </div>
          </div>
        }
        gridSize={12}
        pixelColor="#ffffff"
        animationStepDuration={0.4}
        aspectRatio="100%"
        className="w-[340px]"
      />
      <p className="text-sm text-muted-foreground">Hover the card to reveal the trip</p>
    </div>
  );
}

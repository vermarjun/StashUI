"use client"

import { GlyphMatrix } from "./glyph-matrix"

export default function GlyphMatrixDemo() {
  // Upstream picked the colour with next-themes; StashUI stages are dark.
  // Large, dense glyphs so the field reads at thumbnail size, with a centred
  // focal point the matrix frames.
  return (
    <div className="bg-background relative h-[600px] w-full overflow-hidden">
      <GlyphMatrix
        glyphs="01#%&*+=<>/\{}$@"
        cellSize={24}
        mutationRate={0.08}
        interval={80}
        fadeBottom={0}
        color="#ffffff"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 38% 34% at 50% 50%, var(--background) 0%, color-mix(in oklab, var(--background) 80%, transparent) 45%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
        <span className="rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Build 4.2.0
        </span>
        <h2 className="text-6xl font-semibold tracking-tight text-foreground">
          Compiling the future
        </h2>
        <p className="font-mono text-base text-muted-foreground">
          1,284 modules transformed in 0.42s
        </p>
      </div>
    </div>
  )
}

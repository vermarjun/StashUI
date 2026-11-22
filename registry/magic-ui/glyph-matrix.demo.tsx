"use client"

import { GlyphMatrix } from "./glyph-matrix"

export default function GlyphMatrixDemo() {
  // Upstream picked the colour with next-themes; StashUI stages are dark.
  return (
    <div className="bg-background relative h-[600px] w-full overflow-hidden">
      <GlyphMatrix
        glyphs="01·•+*/\<>="
        cellSize={14}
        mutationRate={0.04}
        interval={90}
        fadeBottom={0.6}
        color="#ffffff"
      />
    </div>
  )
}

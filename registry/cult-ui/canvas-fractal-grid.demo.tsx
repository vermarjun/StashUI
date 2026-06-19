"use client"

import { CanvasFractalGrid } from "@/registry/cult-ui/canvas-fractal-grid"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-100">
      <CanvasFractalGrid
        enableGradient
        dotColor="rgba(100, 100, 255, 1)"
        glowColor="rgba(100, 100, 255, 1)"
        dotOpacity={0.35}
        waveIntensity={30}
        waveRadius={220}
      />
    </div>
  )
}

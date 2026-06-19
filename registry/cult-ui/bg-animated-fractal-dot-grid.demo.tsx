"use client"

import FractalDotGrid from "@/registry/cult-ui/bg-animated-fractal-dot-grid"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-gray-100">
      <FractalDotGrid
        dotColor="rgba(100, 100, 255, 1)"
        glowColor="rgba(100, 100, 255, 1)"
        dotOpacity={0.35}
        waveIntensity={30}
        waveRadius={220}
      />
    </div>
  )
}

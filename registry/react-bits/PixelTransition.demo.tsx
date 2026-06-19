"use client"

import PixelTransition from "@/registry/react-bits/PixelTransition"

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <PixelTransition
        firstContent={
          <div className="flex flex-col items-center justify-center w-full h-full bg-neutral-900 text-white gap-2">
            <span className="text-4xl">🌑</span>
            <span className="text-sm font-medium tracking-wide text-muted-foreground">Hover me</span>
          </div>
        }
        secondContent={
          <div className="flex flex-col items-center justify-center w-full h-full bg-white text-neutral-900 gap-2">
            <span className="text-4xl">🌕</span>
            <span className="text-sm font-medium tracking-wide">Revealed!</span>
          </div>
        }
        gridSize={7}
        pixelColor="#888888"
        animationStepDuration={0.4}
        aspectRatio="100%"
      />
    </div>
  )
}

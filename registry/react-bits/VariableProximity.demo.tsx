"use client"

import { useRef } from "react"
import VariableProximity from "@/registry/react-bits/VariableProximity"

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-8 p-16 min-h-[300px] select-none"
      style={{ fontFamily: '"Roboto Flex", sans-serif' }}
    >
      <VariableProximity
        label="Move your cursor near the letters"
        fromFontVariationSettings="'wght' 100, 'wdth' 75"
        toFontVariationSettings="'wght' 900, 'wdth' 125"
        containerRef={containerRef}
        radius={120}
        falloff="gaussian"
        className="text-3xl text-center leading-tight"
      />
      <VariableProximity
        label="Variable font proximity effect"
        fromFontVariationSettings="'wght' 200, 'wdth' 80"
        toFontVariationSettings="'wght' 800, 'wdth' 110"
        containerRef={containerRef}
        radius={100}
        falloff="exponential"
        className="text-2xl text-gray-500 text-center"
      />
    </div>
  )
}

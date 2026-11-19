"use client"

import { useRef } from "react"
import VariableProximity from "@/registry/react-bits/VariableProximity"

// VariableProximity animates font-variation-settings, so it needs a variable
// font with wght + wdth axes loaded on the page. Roboto Flex is free.
const FONT_FACE = `@font-face{font-family:"Roboto Flex";font-style:normal;font-display:swap;font-weight:100 1000;font-stretch:25% 151%;src:url(https://cdn.jsdelivr.net/npm/@fontsource-variable/roboto-flex@5.0.8/files/roboto-flex-latin-full-normal.woff2) format("woff2-variations");}`

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="flex min-h-[420px] w-full flex-col items-center justify-center gap-6 p-12 select-none text-foreground"
      style={{ fontFamily: '"Roboto Flex", sans-serif' }}
    >
      <style>{FONT_FACE}</style>
      <VariableProximity
        label="Bring your cursor closer"
        fromFontVariationSettings="'wght' 100, 'wdth' 75"
        toFontVariationSettings="'wght' 1000, 'wdth' 140"
        containerRef={containerRef}
        radius={140}
        falloff="gaussian"
        className="text-center text-7xl leading-tight"
      />
      <VariableProximity
        label="and watch every letter respond"
        fromFontVariationSettings="'wght' 200, 'wdth' 80"
        toFontVariationSettings="'wght' 900, 'wdth' 125"
        containerRef={containerRef}
        radius={110}
        falloff="linear"
        className="text-center text-4xl text-muted-foreground"
      />
    </div>
  )
}

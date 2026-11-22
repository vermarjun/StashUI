"use client"

import { useState } from "react"

import { PixelHeading, type PixelHeadingMode } from "./pixel-heading-character"

// Geist Pixel faces, loaded from the geist npm package on jsDelivr so the
// `font-pixel-*` classes the component uses resolve without app-level setup.
const GEIST_PIXEL = "https://cdn.jsdelivr.net/npm/geist@1.7.2/dist/fonts/geist-pixel"
const FACES = ["Square", "Grid", "Circle", "Triangle", "Line"]
const fontCss = FACES.map(
  (f) => `@font-face{font-family:"Geist Pixel ${f}";src:url(${GEIST_PIXEL}/GeistPixel-${f}.woff2) format("woff2");font-display:swap}
.font-pixel-${f.toLowerCase()}{font-family:"Geist Pixel ${f}",ui-monospace,monospace}`
).join("\n")

const MODES: PixelHeadingMode[] = ["wave", "multi", "random", "uniform"]

export default function PixelHeadingCharacterDemo() {
  const [mode, setMode] = useState<PixelHeadingMode>("wave")

  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-10 p-8">
      <style>{fontCss}</style>
      <PixelHeading
        autoPlay
        className="text-center text-6xl text-foreground tracking-tight md:text-8xl"
        cycleInterval={340}
        defaultFontIndex={3}
        key={mode}
        mode={mode}
        showLabel
        staggerDelay={200}
      >
        Ship Pixels
      </PixelHeading>
      <div className="flex gap-2">
        {MODES.map((m) => (
          <button
            className={
              m === mode
                ? "rounded-full bg-foreground px-3.5 py-1.5 font-mono text-background text-xs"
                : "rounded-full bg-muted px-3.5 py-1.5 font-mono text-muted-foreground text-xs hover:text-foreground"
            }
            key={m}
            onClick={() => setMode(m)}
            type="button"
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  )
}

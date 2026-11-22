"use client"

import { useRef, useState } from "react"

import VariableFontAndCursor from "./variable-font-and-cursor"

// Roboto Flex has both a weight (wght) and a slant (slnt) axis.
const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght@8..144,-10..0,25..151,100..1000&display=swap');"

export default function VariableFontAndCursorDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }}
      className="relative h-[600px] w-full cursor-none items-center justify-center overflow-hidden rounded-lg bg-background p-24"
    >
      <style>{FONT_IMPORT}</style>
      <div className="flex h-full w-full items-center justify-center">
        <VariableFontAndCursor
          className="text-9xl text-[#f97316]"
          style={{ fontFamily: "'Roboto Flex', sans-serif" }}
          fontVariationMapping={{
            y: { name: "wght", min: 100, max: 900 },
            x: { name: "slnt", min: 0, max: -10 },
          }}
          containerRef={containerRef}
        >
          stash!
        </VariableFontAndCursor>
      </div>

      <div className="absolute bottom-8 left-8 flex flex-col font-mono">
        <span className="text-xs tabular-nums text-foreground/60">x: {Math.round(pos.x)}</span>
        <span className="text-xs tabular-nums text-foreground/60">y: {Math.round(pos.y)}</span>
      </div>

      <div
        className="pointer-events-none absolute top-0 h-full w-px -translate-x-1/2 bg-foreground/20"
        style={{ left: `${pos.x}px` }}
      />
      <div
        className="pointer-events-none absolute left-0 h-px w-full -translate-y-1/2 bg-foreground/20"
        style={{ top: `${pos.y}px` }}
      />
      <div
        className="pointer-events-none absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-xs bg-[#f97316]"
        style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
      />
    </div>
  )
}

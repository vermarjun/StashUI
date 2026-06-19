"use client"

import { useState } from "react"
import { Backlight } from "@/registry/magic-ui/backlight"

export default function Demo() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <Backlight blur={hovered ? 28 : 20} className="rounded-2xl">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-background px-10 py-8 shadow-lg transition-all duration-300 cursor-default"
          style={{ minWidth: 260 }}
        >
          {/* Colourful gradient blob that the backlight filter blooms */}
          <div
            className="absolute inset-0 rounded-2xl opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40%, #6366f1 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, #ec4899 0%, transparent 55%)",
              zIndex: 0,
            }}
          />
          <span
            className="relative z-10 text-4xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #6366f1, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Backlight
          </span>
          <p className="relative z-10 text-sm text-muted-foreground text-center max-w-[180px]">
            Hover to intensify the bloom filter
          </p>
        </div>
      </Backlight>
    </div>
  )
}

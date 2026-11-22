"use client"

import { Sparkles } from "./sparkles"

export default function SparklesDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black">
      <Sparkles
        density={1200}
        size={1.4}
        speed={1.2}
        direction="top"
        color="#ffffff"
        hover
        className="absolute inset-0 h-full w-full"
      />
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Now in beta</p>
        <h2 className="mt-3 text-6xl font-semibold tracking-tight text-white">
          Ship something bright.
        </h2>
        <p className="mt-4 max-w-md text-base text-white/60">
          A particle field that drifts upward and twinkles, with click-to-burst
          and hover-to-connect built in.
        </p>
      </div>
    </div>
  )
}

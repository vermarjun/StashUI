"use client"

import { useRef } from "react"
import { AnimatedBeam } from "@/registry/magic-ui/animated-beam"

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLDivElement>(null)
  const toRef = useRef<HTMLDivElement>(null)
  const fromRef2 = useRef<HTMLDivElement>(null)
  const toRef2 = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-between w-full max-w-lg h-48 px-12 bg-white rounded-xl border"
    >
      <div
        ref={fromRef}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold shadow-lg"
      >
        A
      </div>

      <div className="flex flex-col items-center gap-4">
        <div
          ref={toRef}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white font-bold shadow-lg"
        >
          B
        </div>
        <div
          ref={fromRef2}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold shadow-lg"
        >
          C
        </div>
      </div>

      <div
        ref={toRef2}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 text-white font-bold shadow-lg"
      >
        D
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef}
        toRef={toRef}
        gradientStartColor="#3b82f6"
        gradientStopColor="#8b5cf6"
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={fromRef2}
        toRef={toRef2}
        gradientStartColor="#22c55e"
        gradientStopColor="#f97316"
        duration={4}
        delay={1}
        curvature={-40}
      />
    </div>
  )
}

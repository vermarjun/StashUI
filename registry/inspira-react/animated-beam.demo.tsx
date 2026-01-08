"use client"

import { useRef } from "react"
import { AnimatedBeam } from "@/registry/inspira-react/animated-beam"

function Circle({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={`z-10 flex size-14 items-center justify-center rounded-full border-2 border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-900 ${className ?? ""}`}
    >
      {children}
    </div>
  )
}

export default function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-8 dark:bg-gray-950"
    >
      <div className="flex w-full max-w-lg items-center justify-between">
        <div className="flex flex-col gap-6">
          <div ref={div1Ref}><Circle>🔷</Circle></div>
          <div ref={div2Ref}><Circle>🟢</Circle></div>
          <div ref={div3Ref}><Circle>🔴</Circle></div>
          <div ref={div4Ref}><Circle>🟡</Circle></div>
        </div>

        <div ref={centerRef}>
          <Circle className="size-20 border-4 border-indigo-400 text-2xl">⚛️</Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={centerRef}
        gradientStartColor="#FFAA40"
        gradientStopColor="#9C40FF"
        curvature={50}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={centerRef}
        gradientStartColor="#40FFAA"
        gradientStopColor="#4090FF"
        delay={1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={centerRef}
        gradientStartColor="#FF4040"
        gradientStopColor="#FF9C40"
        curvature={-50}
        delay={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={centerRef}
        gradientStartColor="#FFD700"
        gradientStopColor="#FF6347"
        delay={1.5}
      />
    </div>
  )
}

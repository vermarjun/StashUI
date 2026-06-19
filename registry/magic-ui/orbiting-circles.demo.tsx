"use client"

import { OrbitingCircles } from "@/registry/magic-ui/orbiting-circles"

export default function Demo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden">
      {/* Inner orbit — faster, reverse direction */}
      <OrbitingCircles radius={90} duration={18} reverse iconSize={32} speed={1.2}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold shadow">A</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white text-xs font-bold shadow">B</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold shadow">C</span>
      </OrbitingCircles>

      {/* Outer orbit — slower, forward */}
      <OrbitingCircles radius={170} duration={28} iconSize={36} speed={0.9}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white text-xs font-bold shadow">D</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold shadow">E</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold shadow">F</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white text-xs font-bold shadow">G</span>
      </OrbitingCircles>

      {/* Hub */}
      <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-background border shadow-lg text-muted-foreground text-sm font-semibold">
        Hub
      </span>
    </div>
  )
}

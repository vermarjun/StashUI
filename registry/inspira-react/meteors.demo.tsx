"use client"

import { Meteors } from "@/registry/inspira-react/meteors"

export default function MeteorsDemo() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-950">
      <Meteors count={20} />
      <div className="relative z-10 text-center">
        <h2 className="text-3xl font-bold text-white">Meteors</h2>
        <p className="mt-2 text-slate-400">CSS-animated meteor shower effect</p>
      </div>
    </div>
  )
}

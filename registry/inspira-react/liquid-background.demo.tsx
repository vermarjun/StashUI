"use client"

import { LiquidBackground } from "@/registry/inspira-react/liquid-background"

export default function LiquidBackgroundDemo() {
  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
      <LiquidBackground className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-2xl font-bold drop-shadow-lg">Liquid Background</span>
      </div>
    </div>
  )
}

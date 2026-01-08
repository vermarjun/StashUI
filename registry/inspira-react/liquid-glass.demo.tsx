"use client"

import { LiquidGlass } from "@/registry/inspira-react/liquid-glass"

export default function LiquidGlassDemo() {
  return (
    <div className="relative w-full h-96 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 rounded-xl overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <LiquidGlass
        radius={24}
        frost={0.08}
        containerClass="relative w-64 h-40"
        className="flex items-center justify-center"
      >
        <div className="text-center p-4">
          <h3 className="text-white font-bold text-lg drop-shadow">Liquid Glass</h3>
          <p className="text-white/80 text-sm drop-shadow">SVG displacement effect</p>
        </div>
      </LiquidGlass>
    </div>
  )
}

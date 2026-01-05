"use client"

import { GradientAnimation } from "@/registry/cult-ui/bg-animated-gradient"

const gradients = [
  {
    stops: [
      { color: "#6366f1", position: 0 },
      { color: "#8b5cf6", position: 50 },
      { color: "transparent", position: 100 },
    ],
    centerX: 20,
    centerY: 30,
  },
  {
    stops: [
      { color: "#ec4899", position: 0 },
      { color: "#f43f5e", position: 50 },
      { color: "transparent", position: 100 },
    ],
    centerX: 80,
    centerY: 70,
  },
  {
    stops: [
      { color: "#06b6d4", position: 0 },
      { color: "#3b82f6", position: 50 },
      { color: "transparent", position: 100 },
    ],
    centerX: 50,
    centerY: 50,
  },
]

export default function Demo() {
  return (
    <div className="relative w-full h-64 rounded-xl overflow-hidden bg-slate-900">
      <GradientAnimation gradients={gradients} animationDuration={4} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <p className="text-white text-xl font-semibold">Animated Gradient Background</p>
      </div>
    </div>
  )
}

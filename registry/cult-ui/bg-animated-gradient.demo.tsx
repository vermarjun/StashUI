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
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-slate-900">
      <GradientAnimation gradients={gradients} animationDuration={4} />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-white text-2xl font-semibold tracking-tight">
          Animated Gradient Background
        </p>
      </div>
    </div>
  )
}

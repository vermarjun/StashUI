"use client"

import Gravity, { MatterBody } from "./gravity"

const pills = [
  { label: "react", color: "#0015ff", x: "30%", y: "10%", angle: 0 },
  { label: "typescript", color: "#e794da", x: "30%", y: "30%", angle: 0 },
  { label: "motion", color: "#1f464d", x: "40%", y: "20%", angle: 10 },
  { label: "tailwind", color: "#ff5941", x: "75%", y: "10%", angle: 0 },
  { label: "drei", color: "#f97316", x: "80%", y: "20%", angle: 0 },
  { label: "matter-js", color: "#ffd726", x: "50%", y: "10%", angle: 0 },
  { label: "radix", color: "#7c3aed", x: "60%", y: "25%", angle: -8 },
  { label: "shadcn", color: "#10b981", x: "20%", y: "15%", angle: 6 },
]

export default function GravityDemo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col overflow-hidden bg-background">
      <div className="w-full pt-16 text-center text-6xl font-semibold italic tracking-tight text-foreground sm:text-7xl md:text-8xl">
        stashui
      </div>
      <p className="w-full pt-4 text-center text-base text-muted-foreground sm:text-xl md:text-2xl">
        components made with:
      </p>
      <Gravity gravity={{ x: 0, y: 1 }} className="h-full w-full">
        {pills.map((p) => (
          <MatterBody
            key={p.label}
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x={p.x}
            y={p.y}
            angle={p.angle}
          >
            <div
              className="rounded-full px-8 py-4 text-xl text-white hover:cursor-grab sm:text-2xl md:text-3xl"
              style={{ backgroundColor: p.color }}
            >
              {p.label}
            </div>
          </MatterBody>
        ))}
      </Gravity>
    </div>
  )
}

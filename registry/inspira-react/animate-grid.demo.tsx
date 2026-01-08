"use client"

import { AnimateGrid } from "@/registry/inspira-react/animate-grid"

const LOGOS = [
  "⚛️", "🔷", "🟢", "🦋",
  "🔥", "💎", "🌊", "⚡",
  "🎯", "🚀", "🌟", "🎨",
  "🔮", "🌈", "🎭", "🔬",
]

const cards = LOGOS.map((logo) => ({ logo }))

export default function AnimateGridDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center bg-white p-8 dark:bg-gray-950">
      <AnimateGrid
        cards={cards}
        perspective={800}
        rotateX={-5}
        rotateY={-15}
        className="w-full max-w-md"
        renderCard={(logo) => (
          <div className="flex h-16 w-full items-center justify-center text-3xl">
            {logo}
          </div>
        )}
      />
    </div>
  )
}

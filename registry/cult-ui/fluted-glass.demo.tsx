"use client"

import { useState } from "react"

import { FlutedGlass } from "./fluted-glass"

export default function FlutedGlassDemo() {
  // Pointer position nudges the texture shift and distortion so the flutes
  // slide over the photo as you move across it.
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 })

  return (
    <div
      className="relative h-[560px] w-full overflow-hidden bg-black"
      onPointerLeave={() => setPointer({ x: 0.5, y: 0.5 })}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setPointer({
          x: (e.clientX - r.left) / r.width,
          y: (e.clientY - r.top) / r.height,
        })
      }}
    >
      <FlutedGlass
        distortion={0.35 + pointer.y * 0.5}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
        shadows={0.3}
        shift={(pointer.x - 0.5) * 0.8}
        size={0.45}
        height="100%"
        style={{ position: "absolute", inset: 0 }}
        width="100%"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-10">
        <p className="font-medium text-sm text-white/70 uppercase tracking-[0.3em]">
          Dolomites, Italy
        </p>
        <h2 className="mt-2 font-semibold text-5xl text-white tracking-tight">
          Seen through glass
        </h2>
      </div>
    </div>
  )
}

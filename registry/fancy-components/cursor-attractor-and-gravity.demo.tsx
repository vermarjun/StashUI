"use client"

import Gravity, { MatterBody } from "./cursor-attractor-and-gravity"

// Deterministic pseudo-random so server and client render the same layout.
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const avatars = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  size: Math.max(22, rand(i + 1) * 60),
  x: `${rand(i + 101) * 100}%`,
  y: `${rand(i + 201) * 30}%`,
  src: `https://i.pravatar.cc/120?img=${(i % 70) + 1}`,
}))

export default function CursorAttractorAndGravityDemo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-background md:items-end">
      <p className="z-20 text-2xl text-foreground sm:text-3xl md:pr-24">
        join the <span className="font-serif italic">community</span>
      </p>
      <Gravity
        attractorPoint={{ x: "33%", y: "50%" }}
        attractorStrength={0.0005}
        cursorStrength={-0.004}
        cursorFieldRadius={200}
        className="h-full w-full"
      >
        {avatars.map((a) => (
          <MatterBody
            key={a.id}
            matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
            x={a.x}
            y={a.y}
          >
            <img
              src={a.src}
              alt={`Community member ${a.id + 1}`}
              className="rounded-full object-cover hover:cursor-pointer"
              style={{ width: `${a.size}px`, height: `${a.size}px` }}
            />
          </MatterBody>
        ))}
      </Gravity>
    </div>
  )
}

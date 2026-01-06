"use client"

import MetaBalls from "@/registry/react-bits/MetaBalls"

export default function Demo() {
  return (
    <div className="w-full max-w-lg h-[400px] bg-black rounded-xl overflow-hidden">
      <MetaBalls
        color="#ffffff"
        cursorBallColor="#9c40ff"
        cursorBallSize={3}
        ballCount={12}
        animationSize={30}
        enableMouseInteraction
        enableTransparency={false}
        speed={0.3}
      />
    </div>
  )
}

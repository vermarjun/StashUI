"use client"

import Ribbons from "@/registry/react-bits/Ribbons"

export default function Demo() {
  return (
    <div className="relative w-full max-w-2xl h-[400px] bg-black rounded-xl overflow-hidden">
      <Ribbons
        colors={["#ff9346", "#7cff67", "#ffee51", "#5227FF"]}
        baseSpring={0.03}
        baseFriction={0.9}
        baseThickness={30}
        enableFade={false}
        enableShaderEffect={false}
        pointCount={50}
        speedMultiplier={0.6}
      />
    </div>
  )
}

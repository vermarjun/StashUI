"use client"

import Ribbons from "@/registry/react-bits/Ribbons"

export default function Demo() {
  return (
    <div className="relative h-[580px] w-full overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-sm tracking-[0.3em] text-white/30 uppercase">
          Move your cursor
        </p>
      </div>
      <Ribbons
        colors={["#ff9346", "#7cff67", "#ffee51", "#5227FF"]}
        baseSpring={0.03}
        baseFriction={0.9}
        baseThickness={64}
        offsetFactor={0.06}
        enableFade={false}
        enableShaderEffect={false}
        pointCount={50}
        speedMultiplier={0.6}
      />
    </div>
  )
}

"use client";

import PixelBlast from "@/registry/react-bits/PixelBlast";

export default function Demo() {
  return (
    <div className="relative h-[640px] w-full overflow-hidden bg-black">
      <PixelBlast
        variant="circle"
        pixelSize={6}
        color="#B19EEF"
        patternScale={3}
        patternDensity={1.25}
        pixelSizeJitter={0.5}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.6}
        edgeFade={0.25}
        transparent
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-5xl font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-6xl">
          Click anywhere.
        </h2>
        <p className="text-neutral-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Every click sends a ripple through the pixels.
        </p>
      </div>
    </div>
  );
}

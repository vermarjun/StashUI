"use client";

import { Ripple, RippleContainer } from "@/registry/inspira-react/ripple";

export default function RippleDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-16 p-12">
      {/* Stand-alone ripple on a coloured background */}
      <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-sky-50 dark:bg-sky-950">
        <span className="relative z-10 text-sm font-semibold">Hover area</span>
        <Ripple
          numberOfCircles={5}
          baseCircleSize={60}
          spaceBetweenCircle={40}
          baseCircleOpacity={0.3}
        />
      </div>

      {/* RippleContainer wrapping content */}
      <RippleContainer
        className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full bg-violet-50 dark:bg-violet-950"
        rippleProps={{
          numberOfCircles: 6,
          baseCircleSize: 80,
          spaceBetweenCircle: 50,
          waveSpeed: 100,
          circleClass: "border-violet-400",
        }}
      >
        <span className="relative z-10 text-sm font-semibold">Ripple&nbsp;Container</span>
      </RippleContainer>
    </div>
  );
}

"use client";

import { BackgroundCubesGrid } from "./background-cubes-grid";

export default function BackgroundCubesGridDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-[#0b0b0d]">
      <BackgroundCubesGrid variant="perspective" />
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-start gap-4 px-6 pt-20 text-center">
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/70 backdrop-blur">
          Realtime infrastructure
        </span>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Every event, felt across the grid
        </h1>
        <p className="max-w-md text-base text-white/60">
          Move your cursor to send a ripple through 1,936 live nodes.
        </p>
      </div>
    </div>
  );
}

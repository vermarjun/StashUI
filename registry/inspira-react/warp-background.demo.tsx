"use client";
import React from "react";
import { WarpBackground } from "@/registry/inspira-react/warp-background";

export default function WarpBackgroundDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden flex items-center justify-center bg-neutral-950 p-8">
      <WarpBackground
        className="w-full max-w-2xl text-center"
        beamsPerSide={4}
        beamSize={5}
        beamDuration={4}
        perspective={200}
      >
        <h1 className="text-4xl font-bold text-white">Warp Background</h1>
        <p className="mt-4 text-neutral-400">
          A perspective grid with animated light beams shooting from all sides.
        </p>
        <button className="mt-6 rounded-lg bg-white px-6 py-2 font-semibold text-black transition hover:bg-white/90">
          Explore
        </button>
      </WarpBackground>
    </div>
  );
}

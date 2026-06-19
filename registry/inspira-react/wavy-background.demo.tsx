"use client";
import React from "react";
import { WavyBackground } from "@/registry/inspira-react/wavy-background";

export default function WavyBackgroundDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <WavyBackground
        backgroundFill="black"
        colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
        waveWidth={50}
        blur={10}
        speed="fast"
        waveOpacity={0.5}
        containerClass="h-full w-full"
      >
        <h1 className="text-center text-4xl font-bold text-white md:text-6xl">
          Wavy Background
        </h1>
        <p className="mt-4 text-center text-lg text-white/70">
          Beautiful animated waves powered by simplex noise
        </p>
      </WavyBackground>
    </div>
  );
}

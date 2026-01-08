"use client";
import React from "react";
import { Vortex } from "@/registry/inspira-react/vortex";

export default function VortexDemo() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Vortex
        backgroundColor="#000000"
        baseHue={220}
        particleCount={500}
        rangeY={150}
        containerClass="h-full w-full"
        className="flex h-full flex-col items-center justify-center"
      >
        <h1 className="text-center text-5xl font-bold text-white">
          Into the Vortex
        </h1>
        <p className="mt-4 text-center text-lg text-white/70">
          A mesmerizing particle animation background
        </p>
        <button className="mt-8 rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-white/90">
          Get Started
        </button>
      </Vortex>
    </div>
  );
}

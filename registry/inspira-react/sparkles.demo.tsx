"use client";

import React from "react";
import { Sparkles } from "@/registry/inspira-react/sparkles";

export default function SparklesDemo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-black">
      <h1 className="relative z-20 text-center text-5xl font-bold text-white md:text-7xl lg:text-8xl">
        Inspira UI
      </h1>
      <div className="relative h-48 w-[44rem] max-w-full">
        {/* Gradient lines */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        <Sparkles
          background="transparent"
          particleColor="#ffffff"
          particleDensity={900}
          speed={2}
          minSize={0.8}
          maxSize={2.2}
          className="[mask-image:radial-gradient(350px_200px_at_top,white_20%,transparent)]"
        />
      </div>
    </div>
  );
}

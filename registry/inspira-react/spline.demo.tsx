"use client";

import React from "react";
import { Spline } from "@/registry/inspira-react/spline";

export default function SplineDemo() {
  return (
    <div className="relative flex h-[560px] w-full max-w-6xl overflow-hidden rounded-xl border border-border bg-black/95">
      <div className="relative z-10 flex flex-1 flex-col justify-center p-10">
        <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          Interactive 3D
        </h1>
        <p className="mt-4 max-w-md text-neutral-300">
          Drop a Spline scene into any page. It lazy-loads the runtime, resizes with
          its container and reacts to the pointer, like this robot tracking your cursor.
        </p>
      </div>
      <div className="relative flex-1">
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="h-full w-full"
        >
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            Loading 3D scene...
          </div>
        </Spline>
      </div>
    </div>
  );
}

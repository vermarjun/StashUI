"use client";

import { ProgressiveBlur } from "@/registry/inspira-react/progressive-blur";

export default function ProgressiveBlurDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12">
      {/* Blur from bottom */}
      <div className="relative h-64 w-80 overflow-hidden rounded-2xl">
        <img
          src="https://picsum.photos/seed/blur1/640/512"
          alt="demo"
          className="h-full w-full object-cover"
        />
        <ProgressiveBlur
          direction="bottom"
          blurLayers={8}
          blurIntensity={0.3}
          className="absolute inset-x-0 bottom-0 h-1/2"
        />
        <p className="absolute bottom-4 left-0 right-0 text-center text-sm font-semibold text-white">
          Blur from bottom
        </p>
      </div>

      {/* Blur from top */}
      <div className="relative h-64 w-80 overflow-hidden rounded-2xl">
        <img
          src="https://picsum.photos/seed/blur2/640/512"
          alt="demo"
          className="h-full w-full object-cover"
        />
        <ProgressiveBlur
          direction="top"
          blurLayers={10}
          blurIntensity={0.4}
          className="absolute inset-x-0 top-0 h-1/2"
        />
        <p className="absolute top-4 left-0 right-0 text-center text-sm font-semibold text-white">
          Blur from top
        </p>
      </div>

      {/* Blur from right */}
      <div className="relative h-64 w-80 overflow-hidden rounded-2xl">
        <img
          src="https://picsum.photos/seed/blur3/640/512"
          alt="demo"
          className="h-full w-full object-cover"
        />
        <ProgressiveBlur
          direction="right"
          blurLayers={8}
          blurIntensity={0.35}
          className="absolute inset-y-0 right-0 w-1/2"
        />
        <p className="absolute right-4 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-white">
          Blur from right
        </p>
      </div>
    </div>
  );
}

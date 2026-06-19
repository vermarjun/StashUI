"use client";

import { DistortedGlass } from "@/registry/cult-ui/distorted-glass";

export default function Demo() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-500 to-indigo-600 p-8">
      {/* Background content */}
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold text-white/90">Distorted Glass Effect</p>
        <p className="text-sm text-white/70 max-w-xs">
          A frosted glass overlay with fractal noise distortion applied via SVG filter.
          Hover to interact.
        </p>
        <div className="flex gap-3 mt-2">
          {["Design", "UI", "Effects"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/30 px-3 py-1 text-xs text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* DistortedGlass sits at the bottom, full width */}
      <div className="mt-6 -mx-8 -mb-8">
        <DistortedGlass className="xl:block hidden" />
        {/* Fallback visible on smaller screens */}
        <div className="xl:hidden w-full h-12 rounded-b-2xl" style={{
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }} />
      </div>
    </div>
  );
}

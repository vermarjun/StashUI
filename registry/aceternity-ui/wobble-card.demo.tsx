"use client";

import { WobbleCard } from "@/registry/aceternity-ui/wobble-card";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-background">
      <WobbleCard containerClassName="max-w-sm w-full" className="min-h-[220px]">
        <h2 className="text-xl font-bold text-white mb-2">Ship faster.</h2>
        <p className="text-sm text-white/70">
          A wobble card that tilts and translates on mouse move, giving depth
          through a parallax inner layer and a radial noise overlay.
        </p>
      </WobbleCard>
    </div>
  );
}

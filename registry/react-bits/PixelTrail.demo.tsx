"use client"

import PixelTrail from "@/registry/react-bits/PixelTrail";

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white/20 text-lg font-medium select-none">Move your cursor</p>
      </div>
      <PixelTrail
        gridSize={40}
        trailSize={0.1}
        maxAge={250}
        color="#ffffff"
      />
    </div>
  );
}

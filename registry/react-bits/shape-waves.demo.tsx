"use client";

import ShapeWaves from "./shape-waves";

export default function ShapeWavesDemo() {
  return (
    <div className="relative h-[640px] w-full overflow-hidden bg-black">
      <ShapeWaves text="STASH" shapes="mixed" color="#9a9a9a" hoverColor="#ffffff" />
    </div>
  );
}

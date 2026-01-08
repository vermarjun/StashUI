"use client";

import { FluidCursor } from "@/registry/inspira-react/fluid-cursor";

export default function FluidCursorDemo() {
  return (
    <div className="relative w-full h-[400px] bg-black flex items-center justify-center overflow-hidden">
      <FluidCursor
        backColor={{ r: 0.05, g: 0, b: 0.1 }}
        splatRadius={0.25}
        densityDissipation={2.5}
        colorUpdateSpeed={8}
      />
      <p className="relative z-10 text-white/40 text-sm select-none pointer-events-none">
        Move your cursor over this area
      </p>
    </div>
  );
}

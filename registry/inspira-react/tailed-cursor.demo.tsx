"use client";

import React from "react";
import { TailedCursor } from "@/registry/inspira-react/tailed-cursor";

export default function TailedCursorDemo() {
  return (
    <div className="relative h-96 w-full rounded-xl overflow-hidden bg-black cursor-none">
      <TailedCursor
        colors={["#ff9346", "#7cff67", "#ffee51", "#00d8ff"]}
        baseSpring={0.03}
        baseFriction={0.9}
        baseThickness={30}
        pointCount={50}
        enableFade={true}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-white/50 text-sm select-none">Move your cursor here</p>
      </div>
    </div>
  );
}

"use client";

import RippleGrid from "@/registry/react-bits/RippleGrid";

export default function Demo() {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden">
      <RippleGrid
        enableRainbow={false}
        gridColor="#ffffff"
        rippleIntensity={0.05}
        gridSize={10}
        gridThickness={15}
        mouseInteraction={true}
        opacity={1}
      />
    </div>
  );
}

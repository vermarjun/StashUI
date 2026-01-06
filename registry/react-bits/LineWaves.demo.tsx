"use client";

import LineWaves from "@/registry/react-bits/LineWaves";

export default function Demo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden">
      <LineWaves
        speed={0.3}
        innerLineCount={32}
        outerLineCount={36}
        warpIntensity={1.0}
        rotation={-45}
        colorCycleSpeed={1.0}
        brightness={0.3}
        color1="#ffffff"
        color2="#a78bfa"
        color3="#38bdf8"
        enableMouseInteraction={true}
        mouseInfluence={2.0}
      />
    </div>
  );
}

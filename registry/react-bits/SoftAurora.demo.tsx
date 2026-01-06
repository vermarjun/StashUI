"use client";

import SoftAurora from "@/registry/react-bits/SoftAurora";

export default function Demo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden">
      <SoftAurora
        speed={0.6}
        scale={1.5}
        brightness={1.0}
        color1="#f7f7f7"
        color2="#e100ff"
        noiseFrequency={2.5}
        noiseAmplitude={1.0}
        bandHeight={0.5}
        bandSpread={1.0}
        octaveDecay={0.1}
        layerOffset={0}
        colorSpeed={1.0}
        enableMouseInteraction={true}
        mouseInfluence={0.25}
      />
    </div>
  );
}

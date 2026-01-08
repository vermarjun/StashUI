"use client";

import { Globe } from "@/registry/inspira-react/globe";

export default function GlobeDemo() {
  return (
    <div className="relative flex items-center justify-center w-full h-[400px] bg-neutral-950 overflow-hidden">
      <Globe
        config={{
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [0.3, 0.3, 0.3],
          markerColor: [0.1, 0.8, 1],
          glowColor: [0.1, 0.1, 0.1],
        }}
      />
    </div>
  );
}

"use client";

import { GridScan } from "@/registry/react-bits/GridScan";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black">
      <GridScan
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#4a3d63"
        gridScale={0.1}
        scanColor="#FF9FFC"
        scanOpacity={0.5}
        scanGlow={0.8}
        scanDuration={2}
        scanDelay={0.4}
        enablePost
        bloomIntensity={0.4}
        chromaticAberration={0.002}
        noiseIntensity={0.01}
      />
    </div>
  );
}

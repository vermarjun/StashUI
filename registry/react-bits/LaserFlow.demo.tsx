"use client"

import LaserFlow from "@/registry/react-bits/LaserFlow";

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <LaserFlow
        color="#FF79C6"
        wispDensity={1}
        flowSpeed={0.35}
        fogIntensity={0.45}
      />
    </div>
  );
}

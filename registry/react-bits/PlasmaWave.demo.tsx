"use client";

import PlasmaWave from "@/registry/react-bits/PlasmaWave";

export default function Demo() {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <PlasmaWave
        colors={["#A855F7", "#06B6D4"]}
        speed1={0.05}
        speed2={0.05}
        bend1={1}
        bend2={0.5}
        focalLength={0.8}
      />
    </div>
  );
}

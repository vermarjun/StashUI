"use client";

import EvilEye from "@/registry/react-bits/EvilEye";

export default function Demo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden">
      <EvilEye
        eyeColor="#FF6F37"
        intensity={1.5}
        pupilSize={0.6}
        irisWidth={0.25}
        glowIntensity={0.35}
        scale={0.8}
        noiseScale={1.0}
        pupilFollow={1.0}
        flameSpeed={1.0}
        backgroundColor="#000000"
      />
    </div>
  );
}

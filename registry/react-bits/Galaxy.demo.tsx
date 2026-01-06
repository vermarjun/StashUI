"use client";

import Galaxy from "@/registry/react-bits/Galaxy";

export default function Demo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden">
      <Galaxy
        hueShift={200}
        density={1.2}
        starSpeed={0.5}
        speed={1.0}
        glowIntensity={0.4}
        saturation={0.5}
        twinkleIntensity={0.5}
        rotationSpeed={0.08}
        transparent={false}
      />
    </div>
  );
}

"use client";

import FluidGlass from "@/registry/react-bits/FluidGlass";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <FluidGlass
        lensProps={{ anisotropy: 0.01, chromaticAberration: 0.1, ior: 1.15, scale: 0.25, thickness: 5, transmission: 1 }}
        mode="lens"
      />
    </div>
  );
}

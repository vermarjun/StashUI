"use client";

import ElectricLogo from "./electric-logo";

export default function ElectricLogoDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black">
      <ElectricLogo color="#9fd8ff" glowColor="#3b82f6" scale={0.9} interactive />
    </div>
  );
}

"use client";

import Ferrofluid from "@/registry/react-bits/Ferrofluid";

export default function Demo() {
  return (
    <div className="w-full h-[500px] bg-black rounded-lg overflow-hidden">
      <Ferrofluid
        colors={["#4F46E5", "#06B6D4", "#E0F2FE"]}
        speed={0.5}
        scale={1.6}
        turbulence={1}
        fluidity={0.1}
        glow={2}
        flowDirection="down"
        opacity={1}
      />
    </div>
  );
}

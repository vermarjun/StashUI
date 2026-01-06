"use client";

import Radar from "@/registry/react-bits/Radar";

export default function Demo() {
  return (
    <div className="w-full h-[400px] bg-black rounded-xl overflow-hidden">
      <Radar
        color="#9f29ff"
        backgroundColor="#000000"
        speed={1.0}
        scale={0.5}
        ringCount={10}
        spokeCount={10}
        sweepSpeed={1.0}
        enableMouseInteraction={true}
      />
    </div>
  );
}

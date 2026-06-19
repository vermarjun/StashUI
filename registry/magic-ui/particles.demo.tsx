"use client";

import { Particles } from "@/registry/magic-ui/particles";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <Particles
        className="absolute inset-0 h-full w-full [pointer-events:auto]"
        quantity={120}
        color="#888888"
        size={0.5}
        staticity={40}
        ease={50}
      />
    </div>
  );
}

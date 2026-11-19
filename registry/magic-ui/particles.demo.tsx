"use client";

import { Particles } from "@/registry/magic-ui/particles";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-neutral-950">
      <span className="pointer-events-none z-10 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-center text-8xl font-semibold leading-none whitespace-pre-wrap text-transparent">
        Particles
      </span>
      <Particles
        className="absolute inset-0 z-0 h-full w-full"
        quantity={260}
        color="#ffffff"
        size={1.4}
        staticity={30}
        ease={60}
        refresh
      />
    </div>
  );
}

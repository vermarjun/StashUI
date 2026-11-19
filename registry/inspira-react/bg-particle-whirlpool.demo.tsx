"use client";

import { BgParticleWhirlpool } from "@/registry/inspira-react/bg-particle-whirlpool";

export default function BgParticleWhirlpoolDemo() {
  return (
    <div className="h-[600px] w-full overflow-hidden rounded-xl bg-black">
      <BgParticleWhirlpool particleCount={400} blur={0}>
        <div className="pointer-events-none flex h-full flex-col items-center justify-end pb-14 text-center">
          <p className="text-5xl font-bold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.9)]">
            Particle Whirlpool
          </p>
          <p className="mt-3 text-base text-white/70 [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]">
            Move your cursor and the swarm follows.
          </p>
        </div>
      </BgParticleWhirlpool>
    </div>
  );
}

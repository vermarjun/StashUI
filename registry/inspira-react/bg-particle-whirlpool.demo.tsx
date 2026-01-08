"use client";

import { BgParticleWhirlpool } from "@/registry/inspira-react/bg-particle-whirlpool";

export default function BgParticleWhirlpoolDemo() {
  return (
    <div className="h-[400px] w-full overflow-hidden rounded-xl bg-black">
      <BgParticleWhirlpool particleCount={1500} blur={0}>
        <div className="flex h-full items-center justify-center">
          <p className="text-2xl font-semibold text-white drop-shadow">Particle Whirlpool</p>
        </div>
      </BgParticleWhirlpool>
    </div>
  );
}

"use client";

import { GlowingEffect } from "@/registry/inspira-react/glowing-effect";

export default function GlowingEffectDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12 bg-neutral-950 min-h-[300px]">
      <div className="relative w-48 h-32 rounded-2xl border border-neutral-700 bg-neutral-900 flex items-center justify-center">
        <GlowingEffect disabled={false} spread={30} proximity={60} />
        <span className="text-white text-sm font-medium z-10">Hover around me</span>
      </div>
      <div className="relative w-48 h-32 rounded-2xl border border-neutral-700 bg-neutral-900 flex items-center justify-center">
        <GlowingEffect disabled={false} variant="white" spread={20} proximity={80} />
        <span className="text-white text-sm font-medium z-10">White variant</span>
      </div>
      <div className="relative w-48 h-32 rounded-2xl border border-neutral-700 bg-neutral-900 flex items-center justify-center">
        <GlowingEffect disabled={false} glow spread={40} borderWidth={2} />
        <span className="text-white text-sm font-medium z-10">Always glow</span>
      </div>
    </div>
  );
}

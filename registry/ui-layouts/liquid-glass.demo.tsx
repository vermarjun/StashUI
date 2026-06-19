"use client";

import { LiquidGlassCard } from "@/registry/ui-layouts/liquid-glass";

export default function Demo() {
  return (
    <div
      className="flex items-center justify-center w-full min-h-[400px] rounded-xl p-10"
      style={{
        background:
          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%)",
      }}
    >
      <LiquidGlassCard
        className="p-8 bg-white/10 w-72"
        borderRadius="24px"
        blurIntensity="xl"
        shadowIntensity="md"
        glowIntensity="sm"
        draggable={true}
      >
        <div className="relative z-30 flex flex-col gap-3 text-white">
          <div className="text-4xl font-bold">24°C</div>
          <div className="text-lg font-medium opacity-90">Partly Cloudy</div>
          <div className="text-sm opacity-70">San Francisco, CA</div>
          <div className="mt-2 text-xs opacity-60">
            Drag me · Hover to glow
          </div>
        </div>
      </LiquidGlassCard>
    </div>
  );
}

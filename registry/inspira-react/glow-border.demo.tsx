"use client";

import { GlowBorder } from "@/registry/inspira-react/glow-border";

export default function GlowBorderDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-12 bg-neutral-950 min-h-[200px]">
      <div className="relative w-48 h-24 bg-neutral-900 rounded-[10px] flex items-center justify-center">
        <GlowBorder color="#06b6d4" borderRadius={10} />
        <span className="text-white text-sm font-medium">Cyan Glow</span>
      </div>
      <div className="relative w-48 h-24 bg-neutral-900 rounded-2xl flex items-center justify-center">
        <GlowBorder color={["#ff0080", "#7928ca", "#0070f3"]} borderRadius={16} duration={5} borderWidth={2} />
        <span className="text-white text-sm font-medium">Multi Color</span>
      </div>
      <div className="relative w-48 h-24 bg-neutral-900 rounded-full flex items-center justify-center">
        <GlowBorder color="#f59e0b" borderRadius={9999} borderWidth={3} duration={8} />
        <span className="text-white text-sm font-medium">Amber Pill</span>
      </div>
    </div>
  );
}

"use client"

import Noise from "@/registry/react-bits/Noise";

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-slate-900 to-indigo-900" />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4">
        <p className="text-3xl font-bold text-white">Film grain overlay</p>
        <p className="text-sm text-white/60">Animated noise texture rendered on a transparent canvas</p>
      </div>
      <Noise patternAlpha={25} patternRefreshInterval={3} />
    </div>
  );
}

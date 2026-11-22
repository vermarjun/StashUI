"use client";

import Strands from "./strands";

export default function StrandsDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <Strands listening />
      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-medium text-white/80">Listening…</p>
        <p className="text-xs text-white/40">Ask about your calendar, notes or inbox</p>
      </div>
    </div>
  );
}

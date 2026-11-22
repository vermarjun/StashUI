"use client";

import PowerOffSlide from "./power-off-slide";

export default function PowerOffSlideDemo() {
  return (
    <div className="flex w-full items-center justify-center p-10">
      <div className="flex h-[420px] w-[300px] flex-col items-center justify-between rounded-[2.5rem] border border-border bg-gradient-to-b from-zinc-900 to-black px-6 py-12">
        <div className="text-center">
          <p className="font-light text-5xl text-white tabular-nums">9:41</p>
          <p className="mt-1 text-sm text-white/60">Tuesday, June 10</p>
        </div>
        <PowerOffSlide duration={2200} />
        <p className="text-white/40 text-xs">Cancel</p>
      </div>
    </div>
  );
}

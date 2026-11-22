"use client";

import SwarmCursor from "./swarm-cursor";

export default function SwarmCursorDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <SwarmCursor>
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center">
          <h2 className="max-w-xl text-5xl font-semibold tracking-tight text-white">Ship the interface tonight</h2>
          <p className="text-base text-white/55">790 components, one install command.</p>
          <div className="flex gap-3">
            <button type="button" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
              Browse components
            </button>
            <button type="button" className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white">
              Read the docs
            </button>
          </div>
        </div>
      </SwarmCursor>
    </div>
  );
}

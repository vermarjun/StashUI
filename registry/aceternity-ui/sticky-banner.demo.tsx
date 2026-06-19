"use client";

import { StickyBanner } from "@/registry/aceternity-ui/sticky-banner";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-y-auto bg-background">
      <StickyBanner className="bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="flex items-center gap-3 text-white">
          <span className="text-sm font-semibold">
            🎉 New components are here!
          </span>
          <a
            href="#"
            className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/30 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            Learn more →
          </a>
        </div>
      </StickyBanner>
      <div className="flex flex-col gap-8 p-8">
        <div className="h-32 rounded-xl bg-muted" />
        <div className="h-32 rounded-xl bg-muted" />
        <div className="h-32 rounded-xl bg-muted" />
        <div className="h-32 rounded-xl bg-muted" />
        <div className="h-32 rounded-xl bg-muted" />
      </div>
    </div>
  );
}

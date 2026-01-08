"use client";

import { BorderBeam } from "@/registry/inspira-react/border-beam";

export default function BorderBeamDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-16">
      {/* Card 1 – default orange→purple beam */}
      <div className="relative flex h-40 w-64 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border bg-card p-6 shadow-sm">
        <span className="text-sm font-semibold text-card-foreground">Default beam</span>
        <span className="text-xs text-muted-foreground">#ffaa40 → #9c40ff</span>
        <BorderBeam />
      </div>

      {/* Card 2 – custom cyan→pink beam, slower */}
      <div className="relative flex h-40 w-64 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
        <span className="text-sm font-semibold text-card-foreground">Custom beam</span>
        <span className="text-xs text-muted-foreground">cyan → pink, 8 s</span>
        <BorderBeam
          colorFrom="#06b6d4"
          colorTo="#ec4899"
          duration={8000}
          borderWidth={2}
          size={120}
        />
      </div>

      {/* Card 3 – delayed start */}
      <div className="relative flex h-40 w-64 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border bg-card p-6 shadow-sm">
        <span className="text-sm font-semibold text-card-foreground">Delayed</span>
        <span className="text-xs text-muted-foreground">2 s delay</span>
        <BorderBeam delay={2000} colorFrom="#22c55e" colorTo="#3b82f6" />
      </div>
    </div>
  );
}

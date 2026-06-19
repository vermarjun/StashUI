"use client";
import Cmp from "@/registry/react-bits/TargetCursor";

export default function Demo() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 cursor-none">
      <Cmp targetSelector=".cursor-target" hideDefaultCursor spinDuration={2} />
      <div className="flex gap-8">
        <button
          className="cursor-target px-6 py-3 rounded-lg border border-border bg-card text-card-foreground text-sm font-medium"
        >
          Hover me
        </button>
        <button
          className="cursor-target px-6 py-3 rounded-lg border border-border bg-card text-card-foreground text-sm font-medium"
        >
          Or me
        </button>
        <button
          className="cursor-target px-6 py-3 rounded-lg border border-border bg-card text-card-foreground text-sm font-medium"
        >
          Or me
        </button>
      </div>
    </div>
  );
}

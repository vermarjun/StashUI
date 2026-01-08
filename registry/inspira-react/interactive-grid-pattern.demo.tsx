"use client";

import { InteractiveGridPattern } from "@/registry/inspira-react/interactive-grid-pattern";

export default function InteractiveGridPatternDemo() {
  return (
    <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background">
      <InteractiveGridPattern
        width={40}
        height={40}
        squares={[20, 10]}
        className="opacity-60"
        squaresClassName="hover:fill-blue-500/20"
      />
      <p className="relative z-10 text-2xl font-bold text-foreground">
        Hover the grid
      </p>
    </div>
  );
}

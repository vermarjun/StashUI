"use client";

import { Focus } from "@/registry/inspira-react/focus";

export default function FocusDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 p-12 bg-neutral-950 min-h-[300px]">
      <Focus
        sentence="Build Beautiful Interfaces"
        borderColor="#06b6d4"
        animationDuration={0.5}
        pauseBetweenAnimations={1.5}
      />
      <Focus
        sentence="Hover Each Word"
        manualMode
        borderColor="#a855f7"
        blurAmount={4}
      />
    </div>
  );
}

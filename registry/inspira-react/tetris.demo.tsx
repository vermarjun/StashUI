"use client";

import { Tetris } from "@/registry/inspira-react/tetris";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-border bg-background">
      <Tetris squareColor="#6366f1" base={12} className="h-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-lg font-semibold text-white/70 drop-shadow">
          Tetris Background
        </p>
      </div>
    </div>
  );
}

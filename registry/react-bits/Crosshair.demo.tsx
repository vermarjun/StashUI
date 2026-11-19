"use client";

import { useRef, RefObject } from "react";
import Crosshair from "@/registry/react-bits/Crosshair";

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-[560px] w-full cursor-none overflow-hidden bg-background select-none"
    >
      <Crosshair
        color="rgba(255, 255, 255, 0.75)"
        containerRef={containerRef as unknown as RefObject<HTMLElement>}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Field notes, vol. 04
        </p>
        <p className="max-w-2xl text-5xl font-bold tracking-tight text-foreground">
          Aim small, miss small.
        </p>
        <p className="text-sm text-muted-foreground">
          Hover a link and the crosshair glitches.
        </p>
        <div className="mt-4 flex gap-8">
          <a href="#" className="pointer-events-auto text-base font-medium text-foreground underline underline-offset-4">
            Read the essay
          </a>
          <a href="#" className="pointer-events-auto text-base font-medium text-foreground underline underline-offset-4">
            View the archive
          </a>
        </div>
      </div>
    </div>
  );
}

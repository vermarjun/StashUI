import { useRef, RefObject } from "react";
import Crosshair from "@/registry/react-bits/Crosshair";

export default function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-[480px] w-full overflow-hidden rounded-xl border border-border bg-background cursor-none select-none"
    >
      <Crosshair
        color="hsl(var(--foreground) / 0.7)"
        containerRef={containerRef as unknown as RefObject<HTMLElement>}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
        <p className="text-2xl font-bold text-foreground">Move your cursor</p>
        <p className="text-sm text-muted-foreground">
          A smooth crosshair tracks your pointer with a turbulence glitch on link hover
        </p>
        <div className="mt-4 flex gap-4">
          <a href="#" className="text-sm underline text-foreground pointer-events-auto">Hover link 1</a>
          <a href="#" className="text-sm underline text-foreground pointer-events-auto">Hover link 2</a>
        </div>
      </div>
    </div>
  );
}

"use client";
import { PointerHighlight } from "@/registry/aceternity-ui/pointer-highlight";

export default function Demo() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-background p-12">
      <PointerHighlight>
        <h2 className="text-3xl font-bold tracking-tight text-foreground px-4 py-2">
          Ship faster than ever
        </h2>
      </PointerHighlight>

      <PointerHighlight
        rectangleClassName="border-blue-500"
        pointerClassName="text-blue-500"
      >
        <p className="text-lg text-muted-foreground px-4 py-2 max-w-sm text-center">
          Build beautiful interfaces with zero friction
        </p>
      </PointerHighlight>

      <PointerHighlight
        rectangleClassName="border-emerald-500"
        pointerClassName="text-emerald-500"
      >
        <span className="text-xl font-semibold text-foreground px-4 py-2 inline-block">
          Open source · MIT license
        </span>
      </PointerHighlight>
    </div>
  );
}

"use client";

import { Click } from "@/registry/animate-ui/primitives-effects-click";

const variants = ["ring", "ripple", "crosshair", "burst", "particles"] as const;

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {variants.map((variant) => (
          <Click key={variant} variant={variant} color="currentColor" size={80}>
            <button
              type="button"
              className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors capitalize"
            >
              {variant}
            </button>
          </Click>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Click any button to see the effect</p>
    </div>
  );
}

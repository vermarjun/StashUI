"use client";

import * as React from "react";
import { Click } from "@/registry/animate-ui/primitives-effects-click";

const variants = ["ring", "ripple", "crosshair", "burst", "particles"] as const;

function EffectButton({ variant }: { variant: (typeof variants)[number] }) {
  // scope each effect to its own button; without a scope every Click listens
  // on the whole document and all five effects fire on any click
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <Click variant={variant} scope={ref} color="currentColor" size={150} duration={750}>
      <button
        ref={ref}
        type="button"
        className="h-14 w-36 rounded-xl border border-border bg-card text-base font-medium capitalize text-foreground transition-colors hover:bg-muted"
      >
        {variant}
      </button>
    </Click>
  );
}

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <div className="flex max-w-3xl flex-wrap justify-center gap-6">
        {variants.map((variant) => (
          <EffectButton key={variant} variant={variant} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Click a button to see its effect</p>
    </div>
  );
}

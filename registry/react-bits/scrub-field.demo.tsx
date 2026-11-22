"use client";

import { useState } from "react";
import ScrubField from "@/registry/react-bits/scrub-field";

export default function Demo() {
  const [radius, setRadius] = useState(16);
  const [blur, setBlur] = useState(24);
  const [opacity, setOpacity] = useState(80);
  return (
    <div className="flex min-h-[460px] w-full items-center justify-center gap-10 bg-background px-6">
      <div className="flex w-[260px] flex-col gap-2 rounded-2xl border border-border bg-card p-4">
        <span className="px-1 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Shadow</span>
        <ScrubField label="Radius" suffix="px" defaultValue={16} min={0} max={48} onChange={setRadius} />
        <ScrubField label="Blur" suffix="px" defaultValue={24} min={0} max={80} onChange={setBlur} />
        <ScrubField label="Opacity" suffix="%" defaultValue={80} min={0} max={100} onChange={setOpacity} />
      </div>
      <div
        className="grid size-40 place-items-center bg-muted text-sm text-muted-foreground"
        style={{
          borderRadius: radius,
          boxShadow: `0 18px ${blur}px color-mix(in oklch, var(--foreground) ${Math.round(opacity * 0.35)}%, transparent)`,
        }}
      >
        Preview
      </div>
    </div>
  );
}

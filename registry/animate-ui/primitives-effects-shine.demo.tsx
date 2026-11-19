"use client";

import { Shine } from "@/registry/animate-ui/primitives-effects-shine";

const base =
  "rounded-xl border border-border bg-card px-8 py-4 text-base font-semibold text-foreground shadow-sm";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-8 p-10">
      {/* Always-on shine, looping */}
      <Shine asChild color="#ffffff" opacity={0.5} duration={1300} loop loopDelay={900} deg={-15}>
        <div className="flex w-[420px] items-center justify-between rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Pro plan</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">$24<span className="text-base text-muted-foreground">/mo</span></p>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Most popular</span>
        </div>
      </Shine>

      <div className="flex gap-5">
        {/* Shine on hover, looping while hovered */}
        <Shine asChild color="#ffffff" opacity={0.6} duration={800} loop loopDelay={300} enableOnHover>
          <button type="button" className={base}>
            Hover me
          </button>
        </Shine>

        {/* Shine on tap */}
        <Shine asChild color="#ffffff" opacity={0.6} duration={700} enableOnTap>
          <button type="button" className={base}>
            Click me
          </button>
        </Shine>
      </div>
    </div>
  );
}

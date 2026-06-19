"use client";

import { Shine } from "@/registry/animate-ui/primitives-effects-shine";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-8">
      {/* Always-on shine */}
      <Shine color="#ffffff" opacity={0.4} duration={1400} loop loopDelay={800}>
        <div className="rounded-xl border border-border bg-gradient-to-br from-violet-600 to-indigo-700 px-6 py-4 text-sm font-semibold text-white shadow-lg">
          Always Shining
        </div>
      </Shine>

      {/* Shine on hover */}
      <Shine color="#ffffff" opacity={0.5} duration={700} enableOnHover enable>
        <div className="rounded-xl border border-border bg-muted px-6 py-4 text-sm font-semibold text-foreground shadow-sm">
          Shine on Hover
        </div>
      </Shine>

      {/* Shine on tap */}
      <Shine color="#a78bfa" opacity={0.6} duration={600} enableOnTap enable={false}>
        <div className="rounded-xl border border-border bg-background px-6 py-4 text-sm font-semibold text-foreground shadow-sm cursor-pointer">
          Shine on Click
        </div>
      </Shine>
    </div>
  );
}

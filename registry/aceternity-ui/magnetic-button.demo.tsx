"use client";

import { MagneticButton } from "@/registry/aceternity-ui/magnetic-button";

export default function MagneticButtonDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-lg flex-col items-center gap-8 rounded-2xl border border-border bg-card px-8 py-12 text-center text-card-foreground shadow-sm">
        <div className="space-y-2">
          <h3 className="font-semibold text-2xl tracking-tight">Magnetic button</h3>
          <p className="text-muted-foreground text-sm">Move your cursor inside the dashed field and the button follows.</p>
        </div>
        <div className="flex items-center gap-2">
          <MagneticButton maxDistance={60} strength={0.45} className="p-8">
            <button
              className="rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground text-sm shadow-sm"
              type="button"
            >
              Get started
            </button>
          </MagneticButton>
          <MagneticButton maxDistance={50} strength={0.4} className="p-8">
            <button
              className="rounded-lg border border-border bg-background px-8 py-3 font-medium text-foreground text-sm shadow-sm transition-colors hover:bg-muted"
              type="button"
            >
              Documentation
            </button>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

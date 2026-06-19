"use client";

import { Pointer } from "@/registry/magic-ui/pointer";

export default function Demo() {
  return (
    <div className="relative flex items-center justify-center p-8">
      <div className="relative flex h-64 w-full max-w-md cursor-none items-center justify-center rounded-xl border border-border bg-muted/20">
        <Pointer>
          {/* Custom pointer label */}
          <div className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background shadow-lg">
            ✦ Hover me
          </div>
        </Pointer>
        <div className="text-center pointer-events-none select-none">
          <p className="text-sm font-semibold text-foreground">Custom Pointer Zone</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Move your cursor inside this area
          </p>
        </div>
      </div>
    </div>
  );
}

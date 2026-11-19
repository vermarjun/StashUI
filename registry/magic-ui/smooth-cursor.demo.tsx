"use client";

import { SmoothCursor } from "@/registry/magic-ui/smooth-cursor";

export default function Demo() {
  return (
    <div className="flex h-[480px] w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center">
      <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
        Smooth Cursor
      </span>
      <h2 className="text-4xl font-semibold tracking-tight text-foreground">
        Move your mouse around
      </h2>
      <p className="max-w-md text-sm text-muted-foreground">
        The native pointer is replaced by a spring-animated arrow that tilts
        toward the direction of travel and squashes as it speeds up.
      </p>
      <SmoothCursor />
    </div>
  );
}

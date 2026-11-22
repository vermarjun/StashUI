"use client";

import FlowField from "@/registry/kokonut-ui/flow-field";

export default function FlowFieldDemo() {
  return (
    <div className="relative h-[640px] w-full overflow-hidden bg-background text-foreground/70">
      <FlowField />
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="rounded-full border border-border bg-background/60 px-3 py-1 text-muted-foreground text-xs backdrop-blur">
          Realtime pipelines
        </p>
        <h2 className="max-w-2xl text-balance font-semibold text-5xl text-foreground tracking-[-0.04em] sm:text-6xl">
          Data that moves the way you think.
        </h2>
        <p className="max-w-md text-balance text-muted-foreground">
          Route events, enrich them in flight and land them anywhere. Move your
          cursor to bend the current.
        </p>
      </div>
    </div>
  );
}

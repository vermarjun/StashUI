"use client";

import { CometCard } from "@/registry/aceternity-ui/comet-card";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[420px] p-10 bg-background">
      <CometCard className="max-w-xs w-full">
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="h-36 w-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
            <span className="text-4xl select-none">🌠</span>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-foreground">Comet Card</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Move your cursor over the card to see 3-D tilt with a glare comet
              following the pointer.
            </p>
          </div>
        </div>
      </CometCard>
    </div>
  );
}

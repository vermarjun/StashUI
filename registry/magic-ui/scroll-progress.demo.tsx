"use client";

import { ScrollProgress } from "@/registry/magic-ui/scroll-progress";

export default function Demo() {
  return (
    <div className="relative w-full">
      {/* ScrollProgress tracks window scroll — show it with a label */}
      <ScrollProgress className="h-1" />
      <div className="flex flex-col items-center gap-4 p-8 pt-6">
        <div className="w-full max-w-md rounded-xl border border-border bg-muted/30 p-6 text-center">
          <p className="text-sm font-semibold text-foreground">Scroll Progress Bar</p>
          <p className="mt-2 text-xs text-muted-foreground">
            The coloured line pinned at the top of the page grows as you scroll down.
            Scroll the page to see it animate.
          </p>
        </div>
        <div className="w-full max-w-md flex items-center gap-3 rounded-lg border border-border bg-background p-4">
          <div className="h-3 flex-1 rounded-full bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]" />
          <span className="text-xs text-muted-foreground whitespace-nowrap">tracks window scroll</span>
        </div>
      </div>
    </div>
  );
}

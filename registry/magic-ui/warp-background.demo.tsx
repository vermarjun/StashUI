"use client";

import { WarpBackground } from "@/registry/magic-ui/warp-background";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden flex items-center justify-center bg-background">
      <WarpBackground className="flex items-center justify-center">
        <div className="text-center px-8 py-6">
          <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-2">
            Warp Background
          </p>
          <h2 className="text-2xl font-bold text-foreground">
            Perspective Grid
          </h2>
        </div>
      </WarpBackground>
    </div>
  );
}

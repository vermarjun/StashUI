"use client";
import { AsciiArt } from "@/registry/aceternity-ui/ascii-art";

export default function Demo() {
  return (
    <div className="flex min-h-[520px] h-full w-full flex-wrap items-center justify-center gap-10 bg-background p-6">
      <div className="flex flex-col items-center gap-2">
        <AsciiArt
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=900&h=600&fit=crop&auto=format&q=80"
          resolution={110}
          charset="standard"
          color="var(--foreground)"
          backgroundColor="transparent"
          animated={true}
          animationStyle="matrix"
          animateOnView={true}
          objectFit="cover"
          className="w-[540px] h-[360px]"
        />
        <span className="text-xs text-muted-foreground">matrix reveal</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AsciiArt
          src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=600&auto=format&fit=crop"
          resolution={80}
          charset="blocks"
          colored={true}
          backgroundColor="transparent"
          animated={true}
          animationStyle="fade"
          animationDuration={1.5}
          animateOnView={true}
          objectFit="cover"
          className="w-[540px] h-[360px]"
        />
        <span className="text-xs text-muted-foreground">colored blocks</span>
      </div>
    </div>
  );
}

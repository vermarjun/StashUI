"use client";
import { AsciiArt } from "@/registry/aceternity-ui/ascii-art";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-8 bg-background p-8">
      <div className="flex flex-col items-center gap-2">
        <AsciiArt
          src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=600&auto=format&fit=crop"
          resolution={80}
          charset="standard"
          color="var(--foreground)"
          backgroundColor="transparent"
          animated={true}
          animationStyle="matrix"
          animateOnView={true}
          objectFit="cover"
          className="w-[340px] h-[220px]"
        />
        <span className="text-xs text-muted-foreground">matrix reveal</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AsciiArt
          src="https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=600&auto=format&fit=crop"
          resolution={60}
          charset="blocks"
          colored={true}
          backgroundColor="transparent"
          animated={true}
          animationStyle="fade"
          animationDuration={1.5}
          animateOnView={true}
          objectFit="cover"
          className="w-[340px] h-[220px]"
        />
        <span className="text-xs text-muted-foreground">colored blocks</span>
      </div>
    </div>
  );
}

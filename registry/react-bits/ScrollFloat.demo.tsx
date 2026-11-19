"use client";
import ScrollFloat from "@/registry/react-bits/ScrollFloat";

export default function Demo() {
  return (
    <div className="flex w-full flex-col items-center bg-background">
      <div className="flex h-[640px] flex-col items-center justify-center gap-3 text-muted-foreground">
        <span className="text-sm uppercase tracking-[0.3em]">Scroll down</span>
        <span className="text-2xl">↓</span>
      </div>
      <ScrollFloat
        containerClassName="text-center"
        textClassName="!text-[clamp(3rem,11vw,9rem)] font-black tracking-tight text-foreground"
        animationDuration={1}
        ease="back.inOut(2)"
        stagger={0.03}
      >
        StashUI
      </ScrollFloat>
      <ScrollFloat
        containerClassName="text-center"
        textClassName="text-muted-foreground"
        stagger={0.02}
      >
        every character floats into place
      </ScrollFloat>
      <div className="h-[700px]" />
    </div>
  );
}

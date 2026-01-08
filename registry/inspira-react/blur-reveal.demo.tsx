"use client";

import { BlurReveal } from "@/registry/inspira-react/blur-reveal";

export default function BlurRevealDemo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 bg-background p-8">
      <BlurReveal duration={0.8} delay={0.25} blur="16px" yOffset={24}>
        <h2 className="text-4xl font-bold tracking-tight">Hello World</h2>
        <p className="text-muted-foreground text-lg">
          Each child animates in with a blur-to-sharp reveal.
        </p>
        <p className="text-muted-foreground">
          Stagger, duration, blur, and Y-offset are all configurable.
        </p>
      </BlurReveal>
    </div>
  );
}

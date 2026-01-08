"use client";

import { TextReveal } from "@/registry/inspira-react/text-reveal";

export default function TextRevealDemo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 bg-background p-8">
      <TextReveal
        className="text-4xl font-bold text-foreground"
        duration={0.7}
        delay={0.1}
        stagger={0.08}
      >
        Words slide up one by one revealing the text
      </TextReveal>
      <TextReveal
        className="text-lg text-muted-foreground"
        duration={0.6}
        delay={0.4}
        stagger={0.06}
      >
        Scroll-triggered line reveal with smooth easing
      </TextReveal>
    </div>
  );
}

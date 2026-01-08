"use client";

import { BoxReveal } from "@/registry/inspira-react/box-reveal";

export default function BoxRevealDemo() {
  return (
    <div className="flex flex-col items-start justify-center gap-3 p-16">
      <BoxReveal color="#5046e6" duration={0.5}>
        <h1 className="text-4xl font-bold">Hello World</h1>
      </BoxReveal>

      <BoxReveal color="#ec4899" duration={0.5} delay={0.4}>
        <p className="text-lg text-muted-foreground">
          This text is revealed with a sliding box animation.
        </p>
      </BoxReveal>

      <BoxReveal color="#22c55e" duration={0.5} delay={0.6}>
        <span className="inline-block rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Get started
        </span>
      </BoxReveal>
    </div>
  );
}

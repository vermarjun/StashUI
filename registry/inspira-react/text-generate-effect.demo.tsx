"use client";

import { TextGenerateEffect } from "@/registry/inspira-react/text-generate-effect";

export default function TextGenerateEffectDemo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center bg-background p-8">
      <TextGenerateEffect
        words="Words generate one by one with a smooth blur-to-clear animation effect."
        filter={true}
        duration={0.7}
        delay={0}
        className="max-w-lg text-center text-2xl font-semibold text-foreground"
      />
    </div>
  );
}

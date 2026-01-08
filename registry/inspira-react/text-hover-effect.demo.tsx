"use client";

import { TextHoverEffect } from "@/registry/inspira-react/text-hover-effect";

export default function TextHoverEffectDemo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center bg-background p-8">
      <div className="w-full max-w-2xl">
        <TextHoverEffect text="HOVER" strokeWidth={0.75} duration={200} opacity={0.75} />
      </div>
    </div>
  );
}

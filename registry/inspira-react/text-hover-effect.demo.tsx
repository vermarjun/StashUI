"use client";

import { TextHoverEffect } from "@/registry/inspira-react/text-hover-effect";

export default function TextHoverEffectDemo() {
  return (
    <div className="flex h-[480px] w-full items-center justify-center">
      <TextHoverEffect duration={200} opacity={0.75} strokeWidth={0.75} text="HOVER" />
    </div>
  );
}

"use client";

import { HyperText } from "@/registry/inspira-react/hyper-text";

export default function HyperTextDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center p-8">
      <HyperText
        text="HyperText Animation"
        duration={1200}
        animateOnLoad
        className="text-2xl font-bold text-white"
      />
    </div>
  );
}

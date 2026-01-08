"use client";

import { InteractiveHoverButton } from "@/registry/inspira-react/interactive-hover-button";

export default function InteractiveHoverButtonDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-4">
      <InteractiveHoverButton text="Get Started" />
      <InteractiveHoverButton text="Learn More" className="border-primary" />
    </div>
  );
}

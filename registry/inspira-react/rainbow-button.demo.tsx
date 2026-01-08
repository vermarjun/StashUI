"use client";

import { RainbowButton } from "@/registry/inspira-react/rainbow-button";

export default function RainbowButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-12">
      <RainbowButton>Default speed</RainbowButton>
      <RainbowButton speed={1}>Fast (1 s)</RainbowButton>
      <RainbowButton speed={4}>Slow (4 s)</RainbowButton>
      <RainbowButton disabled>Disabled</RainbowButton>
    </div>
  );
}

"use client";

import { Hero } from "./wispr-flow-text-animation";

export default function WisprFlowTextAnimationDemo() {
  return (
    <div className="relative w-full overflow-hidden">
      <Hero fontSize={16} textOpacity={0.6} speed={35} />
    </div>
  );
}

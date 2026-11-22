"use client";

import { Hero } from "./wispr-flow-text-animation";

export default function WisprFlowTextAnimationDemo() {
  return (
    // Inset from the stage edges so the curve (which spans its whole viewBox)
    // and the text riding it never run off the frame.
    <div className="relative mx-auto w-full max-w-[880px] overflow-hidden">
      <Hero fontSize={20} textOpacity={0.85} speed={35} />
    </div>
  );
}

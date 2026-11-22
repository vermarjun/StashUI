"use client";

import GradientASCII from "./gradient-ascii";

export default function GradientASCIIDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <GradientASCII className="absolute inset-0" />
    </div>
  );
}

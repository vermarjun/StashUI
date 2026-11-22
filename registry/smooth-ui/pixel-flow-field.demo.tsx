"use client";

import PixelFlowField from "./pixel-flow-field";

export default function PixelFlowFieldDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden">
      <PixelFlowField
        cellSize={7}
        className="h-full w-full"
        colors={[
          "oklch(0.3 0 0)",
          "oklch(0.72 0.2 352.53)",
          "oklch(0.97 0 0)",
        ]}
        gap={3}
        pointerRadius={150}
        text="FLOW"
        weight={900}
      />
    </div>
  );
}

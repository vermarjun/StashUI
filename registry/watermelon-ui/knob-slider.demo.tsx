"use client";

import { useState } from "react";
import { KnobSlider } from "./knob-slider";

export default function KnobSliderDemo() {
  const [value, setValue] = useState(42);
  return (
    <div className="flex min-h-[520px] w-full flex-col items-center justify-center gap-6 p-6">
      <KnobSlider value={value} onChange={setValue} size={320} />
      <p className="text-sm text-muted-foreground">
        Volume, drag around the dial
      </p>
    </div>
  );
}

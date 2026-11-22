"use client";

import { useState } from "react";
import WheelPicker from "@/registry/kokonut-ui/wheel-picker";

export default function WheelPickerDemo() {
  const [value, setValue] = useState<Record<string, string>>({
    hour: "8",
    minute: "41",
    period: "am",
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground">Wake me up at</p>
      <WheelPicker label="Alarm time" onValueChange={setValue} value={value} />
      <p className="font-mono text-xs text-muted-foreground tabular-nums">
        Alarm set for {value.hour}:{value.minute} {value.period}
      </p>
    </div>
  );
}

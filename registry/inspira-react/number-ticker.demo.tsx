"use client";

import { NumberTicker } from "@/registry/inspira-react/number-ticker";

export default function NumberTickerDemo() {
  return (
    <div className="flex min-h-32 flex-col items-center justify-center gap-8 p-8">
      <div className="flex items-center gap-12">
        <div className="flex flex-col items-center gap-1">
          <NumberTicker value={1234567} decimalPlaces={0} duration={2000} />
          <span className="text-xs text-muted-foreground">Count Up</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <NumberTicker
            value={99.99}
            decimalPlaces={2}
            direction="down"
            duration={2000}
          />
          <span className="text-xs text-muted-foreground">Count Down</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <NumberTicker
            value={3.14159}
            decimalPlaces={5}
            duration={1500}
            className="text-2xl font-bold text-primary"
          />
          <span className="text-xs text-muted-foreground">Pi (5 decimals)</span>
        </div>
      </div>
    </div>
  );
}

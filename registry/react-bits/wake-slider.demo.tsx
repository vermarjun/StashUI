"use client";

import WakeSlider from "./wake-slider";

export default function WakeSliderDemo() {
  return (
    <div className="flex min-h-[380px] w-full items-center justify-center p-8">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card px-8 py-8 text-foreground">
        <div className="mb-6">
          <p className="text-sm font-medium text-foreground">Master volume</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Studio Monitors · Output 1-2</p>
        </div>
        <WakeSlider defaultValue={42} showValue formatValue={v => `${Math.round(v)}%`} ariaLabel="Master volume" />
      </div>
    </div>
  );
}

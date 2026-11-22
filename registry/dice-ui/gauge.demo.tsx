"use client";

import * as React from "react";

import {
  Gauge,
  GaugeIndicator,
  GaugeLabel,
  GaugeRange,
  GaugeTrack,
  GaugeValueText,
} from "./gauge";

const metrics = [
  { label: "CPU", base: 64, swing: 18, color: "text-sky-400" },
  { label: "Memory", base: 82, swing: 9, color: "text-violet-400" },
  { label: "Disk I/O", base: 37, swing: 22, color: "text-emerald-400" },
];

export default function GaugeDemo() {
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {metrics.map((m, i) => {
        const value = Math.round(
          m.base + Math.sin(tick * 0.9 + i * 2.1) * m.swing,
        );
        return (
          <div key={m.label} className="flex flex-col items-center gap-3">
            <Gauge value={value} size={160} thickness={12}>
              <GaugeIndicator>
                <GaugeTrack />
                <GaugeRange className={m.color} />
              </GaugeIndicator>
              <GaugeValueText className="text-2xl font-semibold tabular-nums" />
              <GaugeLabel className="sr-only">{m.label}</GaugeLabel>
            </Gauge>
            <span className="text-sm font-medium text-muted-foreground">
              {m.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

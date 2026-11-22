"use client";

import { useState } from "react";
import DitherChart, {
  type DitherChartSeries,
  type DitherChartVariant,
} from "./dither-chart";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

const REVENUE: DitherChartSeries[] = [
  {
    name: "Subscriptions",
    points: [42, 48, 51, 58, 63, 71, 78, 86].map((value, i) => ({
      label: MONTHS[i],
      value,
    })),
  },
  {
    name: "Services",
    points: [18, 21, 19, 24, 27, 26, 31, 34].map((value, i) => ({
      label: MONTHS[i],
      value,
    })),
  },
];

const CHANNELS: DitherChartSeries[] = [
  {
    name: "Signups by channel",
    points: [
      { label: "Organic", value: 46 },
      { label: "Referral", value: 24 },
      { label: "Paid", value: 18 },
      { label: "Partners", value: 12 },
    ],
  },
];

const TABS: { data: DitherChartSeries[]; label: string; variant: DitherChartVariant }[] = [
  { data: REVENUE, label: "Bar", variant: "bar" },
  { data: REVENUE, label: "Line", variant: "line" },
  { data: CHANNELS, label: "Donut", variant: "donut" },
  { data: CHANNELS, label: "Funnel", variant: "funnel" },
];

const PALETTE = ["oklch(0.72 0.2 352.53)", "oklch(0.78 0.13 220)", "oklch(0.82 0.15 85)", "oklch(0.75 0.15 150)"];

export default function DitherChartDemo() {
  const [tab, setTab] = useState(0);
  const active = TABS[tab];

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs">Revenue, 2025 (k$)</p>
            <p className="font-semibold text-2xl text-foreground tabular-nums">$742k</p>
          </div>
          <div className="flex gap-1 rounded-full border border-border p-1">
            {TABS.map((t, i) => (
              <button
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  i === tab
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                key={t.label}
                onClick={() => setTab(i)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <DitherChart
          animate
          data={active.data}
          height={280}
          key={active.variant}
          palette={PALETTE}
          pixelSize={3}
          variant={active.variant}
          width={620}
        />
      </div>
    </div>
  );
}

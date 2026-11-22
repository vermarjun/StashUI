"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AreaFillDefs,
  BarFillDefs,
  ChartActiveDot,
  ChartFrame,
  ChartLegend,
  ChartPlotSurface,
  ChartTooltipContent,
  HoverIndexProvider,
  MONTHLY_TRAFFIC,
  RevealMask,
  SERIES,
  SOL_PRICE,
  areaFillUrl,
  barFillUrl,
  chartGrid,
  chartXAxis,
  chartYAxis,
  createGrowBarShape,
  formatPct,
  formatUsd,
  readActiveTooltipIndex,
  seriesDelta,
  useChartId,
  useChartMotion,
  useIntroStartedAt,
} from "./chart-kit";

function TrafficBars() {
  const id = useChartId("traffic");
  const { reduce } = useChartMotion();
  const introStartedAt = useIntroStartedAt();
  const [hover, setHover] = React.useState<number | null>(null);

  const desktopShape = React.useMemo(
    () =>
      createGrowBarShape({
        introStartedAt,
        dataLength: MONTHLY_TRAFFIC.length,
        reduce,
        radius: [4, 4, 0, 0],
      }),
    [introStartedAt, reduce]
  );
  const mobileShape = React.useMemo(
    () =>
      createGrowBarShape({
        introStartedAt: introStartedAt + 80,
        dataLength: MONTHLY_TRAFFIC.length,
        reduce,
        radius: [4, 4, 0, 0],
      }),
    [introStartedAt, reduce]
  );

  return (
    <ChartFrame className="flex h-[300px] flex-col">
      <ChartLegend />
      <ChartPlotSurface>
        <HoverIndexProvider value={hover}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={MONTHLY_TRAFFIC}
              barGap={3}
              onMouseMove={(state) => setHover(readActiveTooltipIndex(state as { activeTooltipIndex?: number | string | null }))}
              onMouseLeave={() => setHover(null)}
            >
              <defs>
                <BarFillDefs id={`${id}-d`} color={SERIES.desktop.color} variant="gradient" />
                <BarFillDefs id={`${id}-m`} color={SERIES.mobile.color} variant="hatched" />
              </defs>
              <CartesianGrid {...chartGrid} />
              <XAxis dataKey="month" {...chartXAxis} />
              <YAxis {...chartYAxis} />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="desktop"
                name={SERIES.desktop.label}
                fill={barFillUrl(`${id}-d`, "gradient", SERIES.desktop.color)}
                shape={desktopShape}
                isAnimationActive={false}
              />
              <Bar
                dataKey="mobile"
                name={SERIES.mobile.label}
                fill={barFillUrl(`${id}-m`, "hatched", SERIES.mobile.color)}
                shape={mobileShape}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </HoverIndexProvider>
      </ChartPlotSurface>
    </ChartFrame>
  );
}

function PriceArea() {
  const id = useChartId("price");
  const { reduce } = useChartMotion();
  const introStartedAt = useIntroStartedAt();
  const color = "var(--spectrum-chart-3)";

  return (
    <ChartFrame className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={SOL_PRICE} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <AreaFillDefs id={id} color={color} variant="gradient" />
            <RevealMask id={`${id}-mask`} introStartedAt={introStartedAt} reduce={reduce} />
          </defs>
          <CartesianGrid {...chartGrid} />
          <XAxis dataKey="time" {...chartXAxis} tickFormatter={(t: string) => t.replace("t", "D")} />
          <YAxis {...chartYAxis} domain={["dataMin - 4", "dataMax + 4"]} tickFormatter={(v: number) => `$${Math.round(v)}`} />
          <Tooltip
            cursor={{ stroke: "currentColor", strokeOpacity: 0.3, strokeDasharray: "3 3" }}
            content={<ChartTooltipContent />}
          />
          <Area
            type="monotone"
            dataKey="price"
            name="Price"
            stroke={color}
            strokeWidth={2}
            fill={areaFillUrl(id, "gradient", color)}
            mask={`url(#${id}-mask)`}
            isAnimationActive={false}
            activeDot={(props: { cx?: number; cy?: number }) => (
              <ChartActiveDot cx={props.cx} cy={props.cy} color={color} />
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export default function ChartKitDemo() {
  const prices = SOL_PRICE.map((p) => p.price);
  const last = prices[prices.length - 1];
  const delta = seriesDelta(prices);

  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-4 p-6 md:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-medium text-muted-foreground">Visitors</p>
        <p className="text-2xl font-semibold tabular-nums text-card-foreground">
          4,862 <span className="text-sm font-medium text-emerald-400">+12.4%</span>
        </p>
        <TrafficBars />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-medium text-muted-foreground">SOL / USD · 24 days</p>
        <p className="text-2xl font-semibold tabular-nums text-card-foreground">
          {formatUsd(last)}{" "}
          <span className="text-sm font-medium text-emerald-400">{formatPct(delta)}</span>
        </p>
        <PriceArea />
      </div>
    </div>
  );
}

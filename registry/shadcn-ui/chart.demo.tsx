"use client"

import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart"

const revenue = [
  { month: "Jan", subscriptions: 18400, services: 7200 },
  { month: "Feb", subscriptions: 21300, services: 6900 },
  { month: "Mar", subscriptions: 24800, services: 8100 },
  { month: "Apr", subscriptions: 23100, services: 9400 },
  { month: "May", subscriptions: 27600, services: 8800 },
  { month: "Jun", subscriptions: 31200, services: 10300 },
  { month: "Jul", subscriptions: 33900, services: 11200 },
  { month: "Aug", subscriptions: 36400, services: 10900 },
]

const revenueConfig = {
  subscriptions: { label: "Subscriptions", color: "var(--chart-1)" },
  services: { label: "Services", color: "var(--chart-2)" },
} satisfies ChartConfig

const latency = [
  { day: "Mon", p50: 112, p95: 284 },
  { day: "Tue", p50: 108, p95: 262 },
  { day: "Wed", p50: 121, p95: 311 },
  { day: "Thu", p50: 97, p95: 238 },
  { day: "Fri", p50: 104, p95: 251 },
  { day: "Sat", p50: 88, p95: 204 },
  { day: "Sun", p50: 92, p95: 219 },
]

const latencyConfig = {
  p50: { label: "p50 (ms)", color: "var(--chart-3)" },
  p95: { label: "p95 (ms)", color: "var(--chart-4)" },
} satisfies ChartConfig

export default function ChartDemo() {
  return (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-4 p-4 md:grid-cols-5">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Monthly revenue</CardTitle>
          <CardDescription>Jan – Aug 2025, USD</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueConfig} className="h-[260px] w-full">
            <BarChart accessibilityLayer data={revenue}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="subscriptions"
                stackId="a"
                fill="var(--color-subscriptions)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="services"
                stackId="a"
                fill="var(--color-services)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>API latency</CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={latencyConfig} className="h-[260px] w-full">
            <LineChart accessibilityLayer data={latency} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="p50"
                type="monotone"
                stroke="var(--color-p50)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="p95"
                type="monotone"
                stroke="var(--color-p95)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { ChartAreaGradient, ChartAreaLegend, ChartAreaStep } from "./chart-area"

export default function Demo() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 items-start gap-4 p-4 md:grid-cols-3">
      <ChartAreaGradient />
      <ChartAreaLegend />
      <ChartAreaStep />
    </div>
  )
}

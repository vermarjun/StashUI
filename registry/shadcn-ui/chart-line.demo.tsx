"use client"

import { ChartLineMultiple, ChartLineDotsColors, ChartLineLabel } from "./chart-line"

export default function Demo() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 items-start gap-4 p-4 md:grid-cols-3">
      <ChartLineMultiple />
      <ChartLineDotsColors />
      <ChartLineLabel />
    </div>
  )
}

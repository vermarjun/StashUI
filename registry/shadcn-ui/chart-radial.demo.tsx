"use client"

import { ChartRadialText, ChartRadialStacked, ChartRadialLabel } from "./chart-radial"

export default function Demo() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 items-start gap-4 p-4 md:grid-cols-3">
      <ChartRadialText />
      <ChartRadialStacked />
      <ChartRadialLabel />
    </div>
  )
}

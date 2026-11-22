'use client'

import { useEffect, useState } from 'react'
import { Chart } from './animated-chart'

export default function AnimatedChartDemo() {
  // replay the draw-in so the preview loops
  const [run, setRun] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setRun((r) => r + 1), 4000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      <Chart key={`a${run}`} label="Revenue, this month" value="+300%" className="w-[360px]" />
      <Chart key={`b${run}`} label="Active users" value="48.2k" className="w-[360px]" />
    </div>
  )
}

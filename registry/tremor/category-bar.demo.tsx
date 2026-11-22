"use client"

import * as React from "react"

import { CategoryBar } from "./category-bar"

const scores = [612, 668, 724, 781, 742, 690]

export default function CategoryBarDemo() {
  const [i, setI] = React.useState(2)

  React.useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % scores.length), 1800)
    return () => clearInterval(id)
  }, [])

  const score = scores[i]

  return (
    <div className="flex min-h-[520px] w-full items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-5">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium text-foreground">Credit score</p>
            <p className="text-sm text-muted-foreground">Updated today</p>
          </div>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-foreground">{score}</p>
          <CategoryBar
            className="mt-6"
            values={[300, 280, 100, 170]}
            colors={["pink", "amber", "lime", "emerald"]}
            marker={{ value: score - 300, tooltip: `${score} points`, showAnimation: true }}
            showLabels={false}
          />
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">Storage used</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
              74.2 <span className="text-sm font-normal text-muted-foreground">/ 100 GB</span>
            </p>
            <CategoryBar
              className="mt-4"
              values={[42, 21, 11, 26]}
              colors={["blue", "violet", "cyan", "gray"]}
              showLabels={false}
            />
            <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-blue-500" />Video 42 GB</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-violet-500" />Photos 21 GB</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-cyan-500" />Documents 11 GB</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">API latency (p95)</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
              182 <span className="text-sm font-normal text-muted-foreground">ms</span>
            </p>
            <CategoryBar
              className="mt-4"
              values={[100, 100, 200]}
              colors={["emerald", "amber", "pink"]}
              marker={{ value: 182, tooltip: "182 ms" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"

import { SparkAreaChart, SparkBarChart, SparkLineChart } from "./spark-chart"

const seed = [
  2890, 2756, 3322, 3470, 3475, 3129, 3490, 2903, 2643, 2837, 2954, 3239, 3410,
  3120, 3580, 3720, 3390, 3650,
]

function useLiveSeries(base: number[], jitter: number) {
  const [series, setSeries] = React.useState(base)
  React.useEffect(() => {
    let t = 0
    const id = setInterval(() => {
      t += 1
      setSeries((s) => {
        const last = s[s.length - 1]
        const next = Math.max(
          base[0] * 0.6,
          Math.round(last + Math.sin(t * 1.7) * jitter + (Math.cos(t * 0.9) * jitter) / 2),
        )
        return [...s.slice(1), next]
      })
    }, 700)
    return () => clearInterval(id)
  }, [base, jitter])
  return series.map((v, i) => ({ day: `D${i + 1}`, value: v }))
}

const tickers = [
  { symbol: "NVDA", name: "Nvidia", base: seed, jitter: 260, color: "emerald" as const, kind: "area" as const },
  { symbol: "AAPL", name: "Apple", base: seed.map((v) => v * 0.6).reverse(), jitter: 180, color: "pink" as const, kind: "line" as const },
  { symbol: "MSFT", name: "Microsoft", base: seed.map((v) => v * 1.3), jitter: 220, color: "blue" as const, kind: "bar" as const },
  { symbol: "AMZN", name: "Amazon", base: seed.map((v, i) => v * 0.8 + i * 40), jitter: 200, color: "violet" as const, kind: "area" as const },
]

function Row({ t }: { t: (typeof tickers)[number] }) {
  const data = useLiveSeries(t.base, t.jitter)
  const first = data[0].value
  const last = data[data.length - 1].value
  const change = ((last - first) / first) * 100
  const up = change >= 0
  const props = { data, index: "day", categories: ["value"], colors: [t.color], className: "h-10 w-36" }
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="w-28">
        <p className="text-sm font-semibold text-foreground">{t.symbol}</p>
        <p className="text-xs text-muted-foreground">{t.name}</p>
      </div>
      {t.kind === "area" ? (
        <SparkAreaChart {...props} autoMinValue />
      ) : t.kind === "line" ? (
        <SparkLineChart {...props} autoMinValue />
      ) : (
        <SparkBarChart {...props} />
      )}
      <div className="w-24 text-right">
        <p className="text-sm font-medium tabular-nums text-foreground">${(last / 20).toFixed(2)}</p>
        <p className={"text-xs tabular-nums " + (up ? "text-emerald-500" : "text-pink-500")}>
          {up ? "+" : ""}
          {change.toFixed(2)}%
        </p>
      </div>
    </div>
  )
}

export default function SparkChartDemo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="text-sm font-medium text-foreground">Watchlist</p>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live
          </span>
        </div>
        <div className="divide-y divide-border">
          {tickers.map((t) => (
            <Row key={t.symbol} t={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

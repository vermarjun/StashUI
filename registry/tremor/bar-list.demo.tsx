"use client"

import * as React from "react"

import { BarList } from "./bar-list"

const datasets = {
  Pages: [
    { name: "/home", value: 8430 },
    { name: "/pricing", value: 3840 },
    { name: "/docs/getting-started", value: 2210 },
    { name: "/blog/shipping-v2", value: 1080 },
    { name: "/changelog", value: 640 },
    { name: "/careers", value: 230 },
  ],
  Referrers: [
    { name: "google.com", value: 5120 },
    { name: "news.ycombinator.com", value: 4390 },
    { name: "github.com", value: 1870 },
    { name: "x.com", value: 960 },
    { name: "reddit.com", value: 720 },
    { name: "duckduckgo.com", value: 310 },
  ],
  Countries: [
    { name: "United States", value: 6240 },
    { name: "Germany", value: 2980 },
    { name: "India", value: 2730 },
    { name: "United Kingdom", value: 1460 },
    { name: "Brazil", value: 890 },
    { name: "Japan", value: 520 },
  ],
}

type Tab = keyof typeof datasets

export default function BarListDemo() {
  const [tab, setTab] = React.useState<Tab>("Pages")
  const [selected, setSelected] = React.useState<string | null>(null)
  const data = datasets[tab]
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="flex min-h-[520px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Visitors, last 30 days</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums text-foreground">
              {total.toLocaleString()}
            </p>
          </div>
          <div className="flex rounded-md border border-border p-0.5 text-xs">
            {(Object.keys(datasets) as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t)
                  setSelected(null)
                }}
                className={
                  "rounded px-2.5 py-1 transition-colors " +
                  (t === tab
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{tab === "Pages" ? "Page" : tab === "Referrers" ? "Source" : "Country"}</span>
          <span>Visitors</span>
        </div>
        <BarList
          className="mt-2"
          data={data}
          showAnimation
          valueFormatter={(v) => v.toLocaleString()}
          onValueChange={(item) => setSelected(item.name)}
        />
        <p className="mt-4 h-4 text-xs text-muted-foreground">
          {selected ? `Filtering by ${selected}` : "Click a bar to filter the report"}
        </p>
      </div>
    </div>
  )
}

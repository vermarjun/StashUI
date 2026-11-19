"use client";
import { ContainerScroll } from "@/registry/aceternity-ui/container-scroll-animation";

const kpis = [
  { label: "Revenue", value: "$48,210", delta: "+12.4%" },
  { label: "Active users", value: "8,942", delta: "+4.1%" },
  { label: "Conversion", value: "3.82%", delta: "+0.6%" },
  { label: "Churn", value: "1.9%", delta: "-0.3%" },
];
const bars = [38, 52, 44, 61, 58, 72, 66, 80, 74, 88, 83, 95];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const deals = [
  { name: "Acme Corp", owner: "Maya Chen", amount: "$12,400", stage: "Won" },
  { name: "Globex", owner: "Liam Patel", amount: "$8,950", stage: "Proposal" },
  { name: "Initech", owner: "Sofia Reyes", amount: "$6,200", stage: "Won" },
  { name: "Umbrella", owner: "Noah Kim", amount: "$4,780", stage: "Demo" },
];
const nav = ["Overview", "Analytics", "Customers", "Deals", "Reports", "Settings"];

function Dashboard() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-2xl bg-background text-left">
      <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r border-border p-4 md:flex">
        <div className="mb-4 flex items-center gap-2">
          <div className="size-6 rounded-md bg-foreground" />
          <span className="text-sm font-semibold text-foreground">Northwind</span>
        </div>
        {nav.map((n, i) => (
          <div
            key={n}
            className={
              i === 0
                ? "rounded-md bg-muted px-3 py-2 text-sm font-medium text-foreground"
                : "px-3 py-2 text-sm text-muted-foreground"
            }
          >
            {n}
          </div>
        ))}
      </aside>
      <main className="flex min-w-0 flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">Overview</p>
            <p className="text-xs text-muted-foreground">Last 12 months, all regions</p>
          </div>
          <div className="rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground">Export</div>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground">{k.delta} vs last month</p>
            </div>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-5">
          <div className="flex flex-col rounded-xl border border-border bg-card p-4 md:col-span-3">
            <p className="text-sm font-medium text-foreground">Monthly revenue</p>
            <div className="mt-3 flex flex-1 items-end gap-2">
              {bars.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={i === bars.length - 1 ? "w-full rounded-t-md bg-foreground" : "w-full rounded-t-md bg-foreground/25"}
                    style={{ height: `${h * 2}px` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 md:col-span-2">
            <p className="mb-3 text-sm font-medium text-foreground">Recent deals</p>
            <div className="flex flex-col divide-y divide-border">
              {deals.map((d) => (
                <div key={d.name} className="flex items-center justify-between py-2.5">
                  <div>
                    <p className="text-sm text-foreground">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.owner}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{d.amount}</p>
                    <p className="text-xs text-muted-foreground">{d.stage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="flex w-full flex-col overflow-hidden bg-background">
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-semibold text-foreground">
            Every number your team needs <br />
            <span className="mt-1 text-6xl font-bold leading-none md:text-[6rem]">
              One dashboard
            </span>
          </h1>
        }
      >
        <Dashboard />
      </ContainerScroll>
    </div>
  );
}

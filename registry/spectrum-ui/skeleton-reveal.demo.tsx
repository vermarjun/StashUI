"use client";

import * as React from "react";
import { SkeletonReveal } from "./skeleton-reveal";

const people = [
  { name: "Maya Lin", role: "Product Designer", img: 47, status: "Online" },
  { name: "Daniel Okafor", role: "Staff Engineer", img: 12, status: "In a meeting" },
  { name: "Sofia Ramirez", role: "Design Engineer", img: 45, status: "Away" },
];

function RowSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-muted" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 rounded bg-muted" />
        <div className="h-2.5 w-20 rounded bg-muted" />
      </div>
      <div className="h-6 w-16 rounded-full bg-muted" />
    </div>
  );
}

export default function SkeletonRevealDemo() {
  const [loading, setLoading] = React.useState(true);

  // Every time loading starts (mount or Reload), reveal the rows 1.6s later
  React.useEffect(() => {
    if (loading) {
      const t = setTimeout(() => setLoading(false), 1600);
      return () => clearTimeout(t);
    }
  }, [loading]);

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-card-foreground">Team</p>
          <button
            type="button"
            onClick={() => setLoading(true)}
            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Reload
          </button>
        </div>
        <div className="space-y-4">
          {people.map((p) => (
            <SkeletonReveal key={p.name} loading={loading} skeleton={<RowSkeleton />} pulseCount={2}>
              <div className="flex items-center gap-3">
                <img
                  src={`https://i.pravatar.cc/150?img=${p.img}`}
                  alt={p.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-card-foreground">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.role}</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  {p.status}
                </span>
              </div>
            </SkeletonReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

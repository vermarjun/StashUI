"use client";

import { useState } from "react";
import { Input } from "@/registry/ui-layouts/motion-number-input";

const rows = [
  { key: "adults", label: "Adults", hint: "Ages 13 or above", initial: 2 },
  { key: "children", label: "Children", hint: "Ages 2 to 12", initial: 1 },
  { key: "rooms", label: "Rooms", hint: "Up to 9 per booking", initial: 1 },
];

export default function Demo() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(rows.map((r) => [r.key, r.initial])),
  );

  return (
    <div className="w-full max-w-md divide-y divide-border rounded-xl border border-border bg-card">
      {rows.map((r) => (
        <div key={r.key} className="flex items-center justify-between gap-6 px-5 py-4">
          <div>
            <p className="text-sm font-medium text-card-foreground">{r.label}</p>
            <p className="text-xs text-muted-foreground">{r.hint}</p>
          </div>
          <div className="mx-0 [&>div]:mx-0 [&>div]:text-2xl">
            <Input
              value={values[r.key]}
              min={0}
              max={9}
              onChange={(v) => setValues((prev) => ({ ...prev, [r.key]: v }))}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

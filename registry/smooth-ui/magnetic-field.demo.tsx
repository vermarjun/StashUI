"use client";

import { useState } from "react";
import MagneticField, {
  type MagneticFieldItem,
  type MagneticFieldMode,
} from "./magnetic-field";

const COLS = 14;
const ROWS = 7;

const FILINGS: MagneticFieldItem[] = Array.from(
  { length: COLS * ROWS },
  (_, i) => ({
    element: (
      <span
        className="block h-1.5 w-7 rounded-full"
        style={{
          background:
            i % 9 === 0
              ? "oklch(0.72 0.2 352.53)"
              : "color-mix(in oklab, var(--foreground) 70%, transparent)",
        }}
      />
    ),
    id: `filing-${i}`,
  })
);

const MODES: MagneticFieldMode[] = ["attract", "repel", "orbit"];

export default function MagneticFieldDemo() {
  const [mode, setMode] = useState<MagneticFieldMode>("attract");

  return (
    <div className="flex w-full flex-col items-center gap-6 p-8">
      <MagneticField
        className="grid grid-cols-14 place-items-center gap-x-6 gap-y-9 rounded-3xl border border-border bg-card/40 px-10 py-12"
        items={FILINGS}
        mode={mode}
        radius={200}
        rotate
        strength={0.5}
      />
      <div className="flex gap-1 rounded-full border border-border bg-card p-1">
        {MODES.map((m) => (
          <button
            className={`rounded-full px-3.5 py-1.5 text-xs capitalize transition-colors ${
              m === mode
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
            key={m}
            onClick={() => setMode(m)}
            type="button"
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}

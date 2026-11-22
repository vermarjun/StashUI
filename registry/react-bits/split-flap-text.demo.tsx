"use client";

import SplitFlapText from "@/registry/react-bits/split-flap-text";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center gap-6 bg-background px-6">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Departures, Terminal 2</span>
      <SplitFlapText
        words={["LISBON  09:45", "BERLIN  10:20", "TOKYO   11:05", "NEW YORK 12:30"]}
        padTo={14}
        fontSize={48}
        cycleDelay={2200}
      />
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">Gate B12 · Now boarding</span>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import CallChip, { type CallChipStatus } from "./call-chip";

const CYCLE: CallChipStatus[] = ["running", "done", "running", "error"];

export default function CallChipDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => (s + 1) % CYCLE.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  const status = CYCLE[step];

  return (
    <div className="flex min-h-[380px] w-full items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-md flex-col gap-3 text-sm text-foreground">
        <p className="text-muted-foreground">Running checks on the release branch…</p>
        <CallChip icon="search" name="grep" argument={'"TODO" src/'} status="done" size={15} />
        <CallChip icon="file" name="read" argument="src/app/checkout.tsx" status="done" size={15} />
        <CallChip icon="terminal" name="bash" argument="npm run test -- --ci" status={status} expectedMs={1800} size={15} showTimer />
        <CallChip icon="edit" name="edit" argument="src/lib/cart.ts" status={status === "done" ? "running" : "idle"} size={15} />
      </div>
    </div>
  );
}

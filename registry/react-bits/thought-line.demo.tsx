"use client";

import { useEffect, useState } from "react";
import ThoughtLine from "./thought-line";

const STEPS = [
  "Reading the Q3 revenue sheet",
  "Comparing with last quarter",
  "Checking churn by plan",
  "Drafting the summary",
];

export default function ThoughtLineDemo() {
  const [run, setRun] = useState(0);
  const [count, setCount] = useState(1);
  const [working, setWorking] = useState(true);

  useEffect(() => {
    const timers = [
      setTimeout(() => setCount(2), 900),
      setTimeout(() => setCount(3), 1800),
      setTimeout(() => setCount(4), 2700),
      setTimeout(() => setWorking(false), 3900),
      setTimeout(() => {
        setCount(1);
        setWorking(true);
        setRun(r => r + 1);
      }, 9000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [run]);

  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-xl flex-col gap-5">
        <div className="self-end rounded-2xl bg-muted px-4 py-2.5 text-sm text-foreground">
          Why did revenue dip in September?
        </div>
        <div className="flex flex-col gap-3 text-foreground">
          <ThoughtLine key={run} steps={STEPS.slice(0, count)} working={working} fontSize={15} />
          <p
            className="text-sm leading-relaxed text-muted-foreground transition-opacity duration-500"
            style={{ opacity: working ? 0 : 1 }}
          >
            September revenue fell 6.2% because 41 Starter accounts churned after the price change, while Pro
            and Team plans grew 3.8%. Most churned accounts had fewer than two active seats.
          </p>
        </div>
      </div>
    </div>
  );
}

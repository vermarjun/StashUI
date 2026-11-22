"use client";

import { useEffect, useState } from "react";
import StatusMark, { type StatusMarkStatus } from "@/registry/react-bits/status-mark";

const TASKS = ["Read the repository", "Plan the migration", "Update 14 call sites", "Run the test suite", "Open a pull request"];

export default function Demo() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 32), 260);
    return () => clearInterval(id);
  }, []);

  // each task runs for 5 ticks, then the next one starts; the loop resets after all are done
  const stateOf = (i: number): { status: StatusMarkStatus; progress?: number } => {
    const start = i * 5 + 1;
    if (tick < start) return { status: "pending" };
    if (tick < start + 5) return { status: "running", progress: (tick - start + 1) / 5 };
    return { status: "done" };
  };

  return (
    <div className="flex min-h-[420px] w-full items-center justify-center bg-background px-6">
      <div className="flex w-[340px] flex-col gap-1 rounded-2xl border border-border bg-card p-3">
        <span className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Agent run</span>
        {TASKS.map((task, i) => {
          const s = stateOf(i);
          return (
            <div key={task} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground">
              <StatusMark status={s.status} progress={s.progress} size={20} />
              <span className={s.status === "pending" ? "text-muted-foreground" : ""}>{task}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

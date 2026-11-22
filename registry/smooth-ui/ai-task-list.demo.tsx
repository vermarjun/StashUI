"use client";

import { useEffect, useState } from "react";
import AITaskList, { type AITask, type AITaskStatus } from "./ai-task-list";

const PLAN = [
  { id: "read", label: "Read the failing CI logs", note: "3 jobs" },
  { id: "repro", label: "Reproduce the flaky checkout test" },
  { id: "seed", label: "Pin the faker seed in test setup", parent: "fix" },
  { id: "wait", label: "Await the payment iframe before submit", parent: "fix" },
  { id: "run", label: "Run the suite 20x to confirm", note: "20 / 20" },
  { id: "pr", label: "Open a pull request with the fix" },
] as const;

const STEPS = PLAN.length + 2;

const statusAt = (index: number, tick: number): AITaskStatus => {
  if (tick > index) {
    return "done";
  }
  if (tick === index) {
    return "running";
  }
  return "pending";
};

const buildTasks = (tick: number): AITask[] => {
  const flat = PLAN.map((step, index) => ({
    id: step.id,
    label: step.label,
    note: "note" in step ? step.note : undefined,
    status: statusAt(index, tick),
  }));
  const fixChildren = flat.filter((_, i) => "parent" in PLAN[i]);
  const fixStatus: AITaskStatus = fixChildren.every((c) => c.status === "done")
    ? "done"
    : fixChildren.some((c) => c.status !== "pending")
      ? "running"
      : "pending";
  return [
    flat[0],
    flat[1],
    {
      children: fixChildren,
      id: "fix",
      label: "Patch the race condition",
      status: fixStatus,
    },
    flat[4],
    flat[5],
  ];
};

export default function AITaskListDemo() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % STEPS), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5">
        <p className="mb-3 text-muted-foreground text-sm">
          Fixing the flaky checkout test on <span className="text-foreground">main</span>
        </p>
        <AITaskList label="Plan" tasks={buildTasks(tick)} />
      </div>
    </div>
  );
}

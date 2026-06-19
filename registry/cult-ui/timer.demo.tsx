"use client";

import { useState } from "react";
import { Timer } from "@/registry/cult-ui/timer";

export default function Demo() {
  const [running, setRunning] = useState(false);
  const [key, setKey] = useState(0);

  const handleReset = () => {
    setRunning(false);
    setKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8">
      <Timer key={key} loading={running} size="lg" />
      <div className="flex items-center gap-3">
        <button
          onClick={() => setRunning(true)}
          disabled={running}
          className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity disabled:opacity-40"
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          disabled={!running}
          className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground transition-opacity disabled:opacity-40"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

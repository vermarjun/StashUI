"use client";

import { useState } from "react";
import AIOrbFace from "./ai-orb-face";
import type { AIState } from "./ai-orb-face-core";

const STATES: { label: string; state: AIState }[] = [
  { label: "Idle", state: "idle" },
  { label: "Listening", state: "listening" },
  { label: "Thinking", state: "thinking" },
  { label: "Streaming", state: "streaming" },
  { label: "Done", state: "done" },
  { label: "Error", state: "error" },
];

export default function AIOrbFaceDemo() {
  const [state, setState] = useState<AIState>("idle");

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-8">
      <AIOrbFace aria-label={`Assistant is ${state}`} size={240} state={state} />
      <div className="flex flex-wrap justify-center gap-1.5 rounded-full border border-border bg-card p-1">
        {STATES.map((item) => (
          <button
            className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
              item.state === state
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
            key={item.state}
            onClick={() => setState(item.state)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

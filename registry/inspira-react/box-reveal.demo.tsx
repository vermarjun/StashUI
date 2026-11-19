"use client";

import { useState } from "react";
import { BoxReveal } from "@/registry/inspira-react/box-reveal";

export default function BoxRevealDemo() {
  const [run, setRun] = useState(0);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 p-12">
      <div key={run} className="flex w-full max-w-xl flex-col items-start gap-4">
        <BoxReveal color="#fafafa" duration={0.5}>
          <h1 className="text-6xl font-semibold tracking-tight text-foreground">Northwind.</h1>
        </BoxReveal>

        <BoxReveal color="#a3a3a3" duration={0.5}>
          <h2 className="text-xl text-foreground">
            Analytics for teams who <span className="font-semibold">ship weekly</span>
          </h2>
        </BoxReveal>

        <BoxReveal color="#525252" duration={0.5}>
          <p className="text-muted-foreground">
            Funnels, retention and revenue in one dashboard.
            <br />
            Set up in five minutes, no SQL required.
          </p>
        </BoxReveal>

        <BoxReveal color="#fafafa" duration={0.5}>
          <span className="mt-2 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            Start free trial
          </span>
        </BoxReveal>
      </div>

      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        Replay
      </button>
    </div>
  );
}

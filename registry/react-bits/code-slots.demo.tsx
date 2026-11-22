"use client";

import { useState } from "react";
import CodeSlots, { type CodeSlotsStatus } from "./code-slots";

const CORRECT = "428193";

export default function CodeSlotsDemo() {
  const [status, setStatus] = useState<CodeSlotsStatus>("idle");
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card px-8 py-10 text-center">
        <h3 className="text-lg font-semibold text-foreground">Check your inbox</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          We sent a 6-digit code to <span className="text-foreground">maya@stashui.dev</span>
        </p>
        <div className="mt-8">
          <CodeSlots
            length={6}
            status={status}
            onChange={() => setStatus("idle")}
            onComplete={code => setStatus(code === CORRECT ? "success" : "error")}
          />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          {status === "success"
            ? "Verified. Signing you in…"
            : status === "error"
              ? "That code didn’t match. Try again."
              : "Didn’t get it? Resend in 0:42"}
        </p>
      </div>
    </div>
  );
}

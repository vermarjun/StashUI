"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { LetterPullup } from "@/registry/inspira-react/letter-pullup";

export default function LetterPullupDemo() {
  const [run, setRun] = useState(0);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col items-center justify-center gap-2 p-8">
      <div key={run} className="flex flex-col items-center gap-2">
        <LetterPullup words="Launch day" delay={0.05} className="text-6xl md:text-7xl md:leading-[6rem]" />
        <LetterPullup
          words="is finally here"
          delay={0.04}
          className="text-6xl text-blue-500 md:text-7xl md:leading-[6rem] dark:text-blue-400"
        />
      </div>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="size-3.5" />
        Replay
      </button>
    </div>
  );
}

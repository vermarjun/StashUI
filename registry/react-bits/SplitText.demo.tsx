"use client";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import SplitText from "@/registry/react-bits/SplitText";

export default function Demo() {
  const [run, setRun] = useState(0);

  return (
    <div className="relative flex min-h-[380px] w-full flex-col items-center justify-center gap-6 p-12">
      <div key={run} className="flex flex-col items-center gap-5">
        <SplitText
          text="Every letter has a story."
          tag="h2"
          className="text-6xl font-bold tracking-tight text-foreground"
          splitType="chars"
          duration={1.1}
          delay={40}
          rootMargin="0px"
          from={{ opacity: 0, y: 50 }}
          to={{ opacity: 1, y: 0 }}
        />
        <SplitText
          text="Watch them arrive one by one."
          tag="p"
          className="text-2xl text-muted-foreground"
          splitType="words"
          duration={0.9}
          delay={80}
          rootMargin="0px"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
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

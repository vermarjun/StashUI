"use client";

import { useState } from "react";
import RansomNote from "./ransom-note";

export default function RansomNoteDemo() {
  const [run, setRun] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-10 p-8">
      <RansomNote
        animate="assemble"
        className="max-w-2xl text-center text-5xl"
        key={run}
        seed={run + 7}
        text="WE HAVE YOUR CAT"
      />
      <RansomNote
        animate="jitter"
        className="max-w-xl text-center text-2xl"
        intensity={0.4}
        palette={["#fde68a", "#fecaca", "#bfdbfe", "#bbf7d0", "#f5f5f4"]}
        seed={42}
        text="leave $5 in the treat jar"
      />
      <button
        className="rounded-full border border-border bg-card px-4 py-1.5 text-foreground text-xs"
        onClick={() => setRun((r) => r + 1)}
        type="button"
      >
        Cut it out again
      </button>
    </div>
  );
}

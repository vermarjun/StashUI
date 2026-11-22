"use client";

import { useState } from "react";
import TimeMachineStack, { type TimeMachineStackItem } from "./time-machine-stack";

const SNAPSHOTS = [
  { when: "Today, 14:02", words: 1840, title: "Q3 Launch Plan", note: "Added pricing section and FAQ" },
  { when: "Today, 11:47", words: 1612, title: "Q3 Launch Plan", note: "Rewrote the positioning paragraph" },
  { when: "Yesterday, 18:30", words: 1390, title: "Q3 Launch Plan", note: "Timeline moved to August 12" },
  { when: "Mon, 09:15", words: 1104, title: "Q3 Launch Plan", note: "First draft shared with design" },
  { when: "Fri, 16:52", words: 640, title: "Launch notes", note: "Outline and open questions" },
  { when: "Thu, 10:05", words: 212, title: "Untitled", note: "Created" },
];

const ITEMS: TimeMachineStackItem[] = SNAPSHOTS.map((snap) => ({
  content: (
    <div className="flex h-64 flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="font-medium text-foreground text-sm">{snap.title}</span>
        <span className="text-muted-foreground text-xs tabular-nums">{snap.when}</span>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-2.5 w-3/4 rounded bg-foreground/15" />
        <div className="h-2.5 w-full rounded bg-foreground/10" />
        <div className="h-2.5 w-5/6 rounded bg-foreground/10" />
        <div className="h-2.5 w-2/3 rounded bg-foreground/10" />
      </div>
      <div className="mt-auto flex items-center justify-between border-border border-t pt-3 text-xs">
        <span className="text-foreground/80">{snap.note}</span>
        <span className="text-muted-foreground tabular-nums">
          {snap.words.toLocaleString()} words
        </span>
      </div>
    </div>
  ),
  id: snap.when,
}));

export default function TimeMachineStackDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex w-full flex-col items-center gap-4 p-8">
      <div className="w-full max-w-md">
        <TimeMachineStack
          className="h-[420px]"
          index={index}
          items={ITEMS}
          onIndexChange={setIndex}
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className="rounded-full border border-border px-3.5 py-1.5 text-muted-foreground text-xs hover:text-foreground disabled:opacity-40"
          disabled={index === ITEMS.length - 1}
          onClick={() => setIndex((i) => Math.min(ITEMS.length - 1, i + 1))}
          type="button"
        >
          Older
        </button>
        <span className="w-28 text-center text-foreground text-xs tabular-nums">
          {SNAPSHOTS[index].when}
        </span>
        <button
          className="rounded-full border border-border px-3.5 py-1.5 text-muted-foreground text-xs hover:text-foreground disabled:opacity-40"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          type="button"
        >
          Newer
        </button>
      </div>
    </div>
  );
}

"use client";

import SwipeRow from "./swipe-row";

const MAIL = [
  { from: "Maya Chen", subject: "Q3 roadmap review", time: "9:41" },
  { from: "Daniel Okafor", subject: "Invoice #4821 is ready", time: "8:15" },
  { from: "Priya Raman", subject: "Re: launch checklist", time: "Yesterday" },
  { from: "Lucas Martin", subject: "Design crit moved to Thu", time: "Mon" },
];

export default function SwipeRowDemo() {
  return (
    <div className="flex min-h-[460px] w-full items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-md flex-col gap-2">
        {MAIL.map((m) => (
          <SwipeRow key={m.subject} height={68} label={`${m.from}: ${m.subject}`}>
            <div className="flex h-full w-full items-center gap-3 px-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-medium">
                {m.from.split(" ").map((p) => p[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{m.from}</p>
                  <span className="text-xs opacity-50">{m.time}</span>
                </div>
                <p className="truncate text-sm opacity-60">{m.subject}</p>
              </div>
            </div>
          </SwipeRow>
        ))}
      </div>
    </div>
  );
}

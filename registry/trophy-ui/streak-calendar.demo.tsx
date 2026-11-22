"use client";

import * as React from "react";
import { Flame } from "lucide-react";
import { StreakCalendar, type StreakPeriod } from "./streak-calendar";

function key(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// A believable year of practice: runs of active days with gaps, a few freezes,
// and a live 12-day streak ending today. Seeded so it renders the same each time.
function buildStreak(): StreakPeriod[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const periods: StreakPeriod[] = [];
  let offset = 364;
  while (offset > 14) {
    const run = 2 + Math.floor(rand() * 9);
    const start = new Date(today);
    start.setDate(today.getDate() - offset);
    const end = new Date(start);
    end.setDate(start.getDate() + run - 1);
    periods.push({ periodStart: key(start), periodEnd: key(end) });
    if (rand() > 0.7) {
      const freeze = new Date(end);
      freeze.setDate(end.getDate() + 1);
      periods.push({ periodStart: key(freeze), periodEnd: key(freeze), usedFreeze: true });
    }
    offset -= run + 1 + Math.floor(rand() * 4);
  }
  const liveStart = new Date(today);
  liveStart.setDate(today.getDate() - 11);
  periods.push({ periodStart: key(liveStart), periodEnd: key(today) });
  const freeze = new Date(today);
  freeze.setDate(today.getDate() - 5);
  periods.push({ periodStart: key(freeze), periodEnd: key(freeze), usedFreeze: true });
  return periods;
}

export default function StreakCalendarDemo() {
  const [streak, setStreak] = React.useState<StreakPeriod[]>([]);
  // Built after mount: the data is relative to "today", which differs between server and client
  React.useEffect(() => setStreak(buildStreak()), []);

  return (
    <div className="flex min-h-[600px] w-full flex-col items-center justify-center gap-4 p-6">
      <div className="w-full max-w-[1060px] rounded-2xl border border-border bg-card p-6 text-card-foreground">
        <div className="mb-2 flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-400" aria-hidden="true" />
          <span className="text-sm font-medium text-muted-foreground">Current streak</span>
          <span className="text-sm font-semibold">12 days</span>
        </div>
        <StreakCalendar streak={streak} view="year" startOfWeek={1} className="max-w-none" />
      </div>
      {/* Year + week only: with the month card too the stack ran past an 8:5
          frame. The month view is the same component with view="month". */}
      <div className="flex w-full max-w-[1060px] items-center gap-8 rounded-2xl border border-border bg-card px-6 py-5 text-card-foreground">
        <p className="shrink-0 text-sm font-medium text-muted-foreground">This week</p>
        <StreakCalendar streak={streak} view="week" startOfWeek={1} className="max-w-none flex-1" />
      </div>
    </div>
  );
}

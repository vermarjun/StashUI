"use client";

import { addDays, format } from "date-fns";
import { useState } from "react";
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "./mini-calendar";

const agenda = [
  [
    { time: "09:30", title: "Design review: onboarding flow", who: "Maya, Leo" },
    { time: "13:00", title: "Lunch with Priya", who: "Café Lumen" },
  ],
  [
    { time: "10:00", title: "Sprint planning", who: "Product team" },
    { time: "15:30", title: "1:1 with Tom", who: "Zoom" },
    { time: "18:00", title: "Climbing session", who: "Boulder Lab" },
  ],
  [{ time: "11:00", title: "Customer call: Northwind", who: "Ana, Sam" }],
  [
    { time: "08:45", title: "Dentist", who: "Dr. Weber" },
    { time: "14:00", title: "Ship v2.3 release notes", who: "Focus block" },
  ],
];

export default function MiniCalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(() => new Date());
  const events = date ? agenda[date.getDate() % agenda.length] : [];

  return (
    <div className="flex w-full flex-col items-center gap-4 p-8">
      <MiniCalendar
        days={7}
        defaultStartDate={addDays(new Date(), -2)}
        onValueChange={setDate}
        value={date}
      >
        <MiniCalendarNavigation direction="prev" />
        <MiniCalendarDays>
          {(d) => (
            <MiniCalendarDay
              data-day={format(d, "yyyy-MM-dd")}
              date={d}
              key={d.toISOString()}
            />
          )}
        </MiniCalendarDays>
        <MiniCalendarNavigation direction="next" />
      </MiniCalendar>

      <div className="w-full max-w-md rounded-lg border bg-background p-4">
        <p className="mb-3 font-medium text-sm">
          {date ? format(date, "EEEE, MMMM d") : "Pick a day"}
        </p>
        <ul className="space-y-2">
          {events.map((e) => (
            <li className="flex gap-3 text-sm" key={e.title}>
              <span className="w-12 shrink-0 font-mono text-muted-foreground">
                {e.time}
              </span>
              <span className="flex-1">
                {e.title}
                <span className="block text-muted-foreground text-xs">
                  {e.who}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

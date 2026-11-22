"use client";

import { Clock } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { RelativeTimeCard } from "./relative-time-card";

export default function RelativeTimeCardDemo() {
  const [now] = React.useState(() => new Date());
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const rows = [
    { who: "Maya Chen", what: "merged #482 into main", date: fiveMinutesAgo },
    { who: "Leo Park", what: "deployed v2.14.0 to production", date: oneHourAgo },
    { who: "Ana Ruiz", what: "opened an incident review", date: oneDayAgo },
    { who: "Release bot", what: "scheduled the 2.15 freeze", date: tomorrow },
  ];

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <ul className="flex flex-col divide-y divide-border rounded-xl border bg-card">
        {rows.map((r) => (
          <li
            key={r.who}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
          >
            <span className="truncate">
              <span className="font-medium">{r.who}</span>{" "}
              <span className="text-muted-foreground">{r.what}</span>
            </span>
            <RelativeTimeCard
              date={r.date}
              timezones={["America/New_York", "Europe/London", "Asia/Tokyo"]}
            />
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <RelativeTimeCard date={now} asChild>
          <Button variant="outline" size="sm">
            <Clock />
            View time details
          </Button>
        </RelativeTimeCard>
        <RelativeTimeCard date={oneHourAgo} variant="muted" />
        <RelativeTimeCard date={oneHourAgo} variant="ghost" />
      </div>
    </div>
  );
}

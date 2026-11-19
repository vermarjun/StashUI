"use client";

import { parseDate, parseTime } from "@internationalized/date";
import { Label } from "react-aria-components";

import { DateField, DateInput, TimeField } from "@/registry/origin-ui/datefield-rac";

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm">
        <div>
          <h3 className="font-semibold text-base">Schedule a meeting</h3>
          <p className="mt-1 text-muted-foreground text-sm">Type or use arrow keys on each segment.</p>
        </div>
        <DateField className="space-y-2" defaultValue={parseDate("2026-11-24")}>
          <Label className="font-medium text-foreground text-sm">Date</Label>
          <DateInput />
        </DateField>
        <TimeField className="space-y-2" defaultValue={parseTime("14:30")}>
          <Label className="font-medium text-foreground text-sm">Start time</Label>
          <DateInput />
        </TimeField>
        <DateField className="space-y-2">
          <Label className="font-medium text-foreground text-sm">Follow-up (optional)</Label>
          <DateInput />
        </DateField>
      </div>
    </div>
  );
}

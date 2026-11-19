"use client";

import { useState } from "react";
import { SmartDatetimeInput } from "@/registry/ui-layouts/datetime-input";

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="flex min-h-[320px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md space-y-3">
        <label className="text-sm font-medium text-foreground">Schedule post</label>
        <SmartDatetimeInput
          value={date}
          onValueChange={setDate}
          placeholder='Try "tomorrow at 5pm" or "next friday 9am"'
        />
        <p className="h-5 text-sm text-muted-foreground">
          {date
            ? `Publishes ${date.toLocaleString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}`
            : "Type a date in plain English and press Enter."}
        </p>
      </div>
    </div>
  );
}

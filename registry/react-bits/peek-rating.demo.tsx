"use client";

import { useState } from "react";
import PeekRating from "./peek-rating";

export default function PeekRatingDemo() {
  const [value, setValue] = useState(0);
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card px-8 py-10 text-center">
        <img src="https://i.pravatar.cc/150?img=47" alt="" className="h-12 w-12 rounded-full object-cover" />
        <h3 className="mt-4 text-base font-semibold text-foreground">How was your session with Priya?</h3>
        <p className="mt-1 text-sm text-muted-foreground">Portfolio review · 45 min</p>
        <div className="mt-8">
          <PeekRating
            value={value}
            onChange={setValue}
            size={36}
            labels={["Not helpful", "Okay", "Good", "Great", "Life-changing"]}
          />
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          {value ? `You rated ${value} of 5. Thanks!` : "Tap a star to rate"}
        </p>
      </div>
    </div>
  );
}

"use client";

import AttractButton from "@/registry/kokonut-ui/attract-button";

export default function AttractButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <AttractButton radius={88}>Join the waitlist</AttractButton>
      <p className="text-sm text-muted-foreground">
        Bring the cursor close and the filings line up.
      </p>
    </div>
  );
}

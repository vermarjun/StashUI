"use client";

import CradleText from "@/registry/kokonut-ui/cradle-text";

export default function CradleTextDemo() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-2 px-6">
      <CradleText text="Momentum" />
      <p className="text-sm text-muted-foreground">
        Pull the first letter out and let it go.
      </p>
    </div>
  );
}

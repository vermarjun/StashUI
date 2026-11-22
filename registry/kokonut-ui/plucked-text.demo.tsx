"use client";

import PluckedText from "@/registry/kokonut-ui/plucked-text";

export default function PluckedTextDemo() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-4 px-6">
      <PluckedText text="Good vibrations" />
      <p className="text-muted-foreground text-sm">
        Grab the string and let go, or sweep across it to strum.
      </p>
    </div>
  );
}

"use client";

import EchoText from "./echo-text";

export default function EchoTextDemo() {
  return (
    <div className="flex min-h-[460px] w-full items-center justify-center overflow-hidden p-8 text-foreground">
      <EchoText text="Afterglow" fontWeight={700} />
    </div>
  );
}

"use client";

import { Input, SmoothInput } from "./smooth-caret-input";

export default function SmoothCaretInputDemo() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-4 bg-background p-8 text-foreground">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Smooth caret vs native caret</p>
      <SmoothInput aria-label="Smooth caret input" placeholder="Search projects…" />
      <Input
        placeholder="Native caret"
        className="caret-primary text-2xl"
        wrapperClassName="max-w-[420px] p-4"
        aria-label="Normal input"
      />
    </div>
  );
}

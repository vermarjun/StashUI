"use client";

import TextCursor from "@/registry/react-bits/TextCursor";

export default function Demo() {
  return (
    <div className="relative h-[480px] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-muted/20">
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 select-none">
        <span className="text-6xl">✦</span>
        <h2 className="text-4xl font-semibold tracking-tight text-foreground">
          Text Cursor
        </h2>
        <p className="text-sm text-muted-foreground">
          Move your cursor here to leave a trail of floating glyphs
        </p>
      </div>
      <TextCursor
        text="✦"
        spacing={80}
        maxPoints={8}
        followMouseDirection
        randomFloat
        exitDuration={0.6}
      />
    </div>
  );
}

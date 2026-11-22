"use client";

import FigmaComment from "./figma-comment";

export default function FigmaCommentDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="relative h-[420px] w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-muted/40">
        {/* A faux canvas frame so the pins sit on a design */}
        <div className="absolute top-10 left-10 h-[300px] w-[420px] rounded-xl border border-border bg-background p-6 shadow-xl">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="mt-6 h-8 w-64 rounded bg-foreground/80" />
          <div className="mt-3 h-3 w-72 rounded bg-muted" />
          <div className="mt-2 h-3 w-56 rounded bg-muted" />
          <div className="mt-8 flex gap-3">
            <div className="h-10 w-32 rounded-lg bg-violet-500" />
            <div className="h-10 w-28 rounded-lg border border-border" />
          </div>
        </div>
        <span className="absolute top-4 left-10 text-[11px] text-muted-foreground">
          Landing / Hero: Desktop
        </span>

        <FigmaComment
          authorName="Maya Chen"
          avatarUrl="https://i.pravatar.cc/96?img=47"
          className="absolute top-[150px] left-[330px]"
          message="Can we bump the headline to 56px? It feels light next to the CTA on large screens."
          timestamp="2m"
          width={220}
        />
        <FigmaComment
          authorName="Leo Park"
          avatarUrl="https://i.pravatar.cc/96?img=12"
          className="absolute top-[300px] left-[170px]"
          message="Secondary button needs the new outline token, this is still the old grey."
          timestamp="14m"
          width={220}
        />
        <FigmaComment
          authorName="Ana Ruiz"
          avatarUrl="https://i.pravatar.cc/96?img=32"
          className="absolute top-[110px] left-[460px]"
          message="Love this direction. Ship it to review on Thursday?"
          timestamp="1h"
          width={200}
        />
      </div>
    </div>
  );
}

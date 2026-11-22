"use client";

import HoldButton from "./hold-button";

export default function HoldButtonDemo() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center">
        <h3 className="text-base font-semibold text-foreground">Delete &ldquo;Q3 Launch Plan&rdquo;?</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          14 files and 3 shared links will be removed for everyone on the team.
        </p>
        <div className="mt-6 flex justify-center">
          <HoldButton fillColor="#e5484d" doneLabel="Project deleted">
            Hold to delete
          </HoldButton>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Let go early and the fill drains back.</p>
    </div>
  );
}

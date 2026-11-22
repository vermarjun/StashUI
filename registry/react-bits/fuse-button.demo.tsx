"use client";

import FuseButton from "./fuse-button";

export default function FuseButtonDemo() {
  return (
    <div className="flex min-h-[380px] w-full items-center justify-center p-8">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
        <p className="text-sm font-medium text-foreground">Newsletter cleanup</p>
        <p className="mt-1 text-sm text-muted-foreground">12 promotional emails from the last 30 days, 4.3 MB in total.</p>
        <div className="mt-6 flex justify-end">
          <FuseButton label="Archive 12 emails" doneLabel="Archived" undoLabel="Undo" />
        </div>
      </div>
    </div>
  );
}

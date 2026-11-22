"use client";
/* eslint-disable @next/next/no-img-element */

import { Trash2 } from "lucide-react";
import UndoButton from "./undo-button";

export default function UndoButtonDemo() {
  return (
    <div className="flex min-h-[380px] w-full items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-5">
        <div className="flex items-start gap-3">
          <img
            alt=""
            className="size-10 shrink-0 rounded-full object-cover"
            src="https://i.pravatar.cc/150?img=47"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="font-medium text-foreground text-sm">Priya Raman</p>
              <span className="text-muted-foreground text-xs tabular-nums">
                09:42
              </span>
            </div>
            <p className="truncate text-foreground text-sm">
              Q3 roadmap review moved to Thursday
            </p>
            <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
              Hey team, we&apos;re pushing the review to Thursday at 2pm so finance
              can join. Slides are in the shared folder, comments by Wednesday
              please.
            </p>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <UndoButton />
          <UndoButton
            doneLabel="Deleted"
            icon={Trash2}
            label="Delete"
          />
        </div>
      </div>
    </div>
  );
}

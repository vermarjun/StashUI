"use client";

import { ArrowUp, Paperclip } from "lucide-react";
import AIModelSelector from "@/registry/kokonut-ui/ai-model-selector";

export default function AIModelSelectorDemo() {
  return (
    <div className="flex h-[540px] w-full flex-col items-center justify-end px-4 pb-10">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-3 shadow-sm">
        <p className="px-2 pt-1 pb-6 text-sm text-muted-foreground">
          Refactor the checkout form to validate postcodes before submit…
        </p>
        <div className="flex items-center gap-2">
          <AIModelSelector className="flex-1" />
          <button
            aria-label="Attach file"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
            type="button"
          >
            <Paperclip className="size-4" />
          </button>
          <button
            aria-label="Send"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
            type="button"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

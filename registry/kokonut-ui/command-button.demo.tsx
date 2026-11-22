"use client";

import { useState } from "react";
import CommandButton from "./command-button";

export default function CommandButtonDemo() {
  const [last, setLast] = useState<string | null>(null);

  return (
    <div className="flex min-h-[380px] w-full flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <CommandButton onClick={() => setLast("Opened search")} shortcut="mod+k">
          Search docs
        </CommandButton>
        <CommandButton
          onClick={() => setLast("Created a new issue")}
          shortcut="mod+shift+i"
        >
          New issue
        </CommandButton>
        <CommandButton onClick={() => setLast("Copied share link")} shortcut="mod+s">
          Share
        </CommandButton>
      </div>
      <p className="h-5 text-muted-foreground text-sm" aria-live="polite">
        {last ?? "Press the shortcut anywhere on the page"}
      </p>
    </div>
  );
}

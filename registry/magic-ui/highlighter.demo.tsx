"use client";
import { Highlighter } from "@/registry/magic-ui/highlighter";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12 text-center">
      <p className="text-2xl font-semibold text-foreground">
        The{" "}
        <Highlighter color="#fde68a" animationDuration={800}>
          highlighted text
        </Highlighter>{" "}
        draws across on view.
      </p>
      <p className="text-xl text-muted-foreground">
        Switch to{" "}
        <Highlighter action="underline" color="#a5f3fc" animationDuration={600}>
          underline mode
        </Highlighter>{" "}
        or{" "}
        <Highlighter action="box" color="#d8b4fe" animationDuration={700}>
          box style
        </Highlighter>{" "}
        for variety.
      </p>
    </div>
  );
}

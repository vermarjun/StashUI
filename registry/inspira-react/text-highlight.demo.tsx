"use client";

import { TextHighlight } from "@/registry/inspira-react/text-highlight";

export default function TextHighlightDemo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center bg-background p-8">
      <p className="max-w-lg text-center text-2xl font-semibold leading-relaxed text-foreground">
        Build{" "}
        <TextHighlight
          delay={300}
          duration={1500}
          highlightColor="hsl(47, 95%, 70%, 0.5)"
          textEndColor="#111"
        >
          beautiful interfaces
        </TextHighlight>{" "}
        that{" "}
        <TextHighlight
          delay={1200}
          duration={1500}
          highlightColor="hsl(217, 91%, 60%, 0.35)"
        >
          delight users
        </TextHighlight>{" "}
        every time.
      </p>
    </div>
  );
}

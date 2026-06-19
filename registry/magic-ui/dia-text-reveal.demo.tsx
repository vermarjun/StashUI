"use client";

import { DiaTextReveal } from "@/registry/magic-ui/dia-text-reveal";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <h2 className="text-4xl font-bold text-foreground">
        Crafted with{" "}
        <DiaTextReveal
          text={["precision.", "purpose.", "passion."]}
          repeat
          duration={1.5}
          repeatDelay={0.8}
          className="font-bold"
        />
      </h2>
    </div>
  );
}

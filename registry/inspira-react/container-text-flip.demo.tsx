"use client";

import { ContainerTextFlip } from "@/registry/inspira-react/container-text-flip";

export default function ContainerTextFlipDemo() {
  return (
    <div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-4 p-8">
      <div className="text-2xl font-semibold text-foreground">
        Build things that are{" "}
      </div>
      <ContainerTextFlip
        words={["better", "faster", "beautiful", "modern", "awesome"]}
        interval={2500}
      />
    </div>
  );
}

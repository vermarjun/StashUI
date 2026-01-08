"use client";

import { NeonBorder } from "@/registry/inspira-react/neon-border";

export default function NeonBorderDemo() {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-6 p-8">
      <NeonBorder color1="#0496ff" color2="#ff0a54" animationType="half">
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-background px-4 py-2 text-sm font-medium">
          Neon Border — Half
        </div>
      </NeonBorder>

      <NeonBorder color1="#a855f7" color2="#ec4899" animationType="full" duration={4}>
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-background px-4 py-2 text-sm font-medium">
          Neon Border — Full
        </div>
      </NeonBorder>

      <NeonBorder color1="#22c55e" color2="#f59e0b" animationType="none">
        <div className="flex h-full w-full items-center justify-center rounded-lg bg-background px-4 py-2 text-sm font-medium">
          Neon Border — Static
        </div>
      </NeonBorder>
    </div>
  );
}

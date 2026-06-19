"use client";

import { InteractiveGridPattern } from "@/registry/magic-ui/interactive-grid-pattern";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <InteractiveGridPattern
        squares={[28, 18]}
        className="[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
      />
    </div>
  );
}

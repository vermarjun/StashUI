"use client";

import TechText from "./tech-text";

export default function TechTextDemo() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden text-foreground">
      <TechText text="Blueprint" fontSize={140} />
    </div>
  );
}

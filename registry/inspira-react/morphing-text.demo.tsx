"use client";

import { MorphingText } from "@/registry/inspira-react/morphing-text";

export default function MorphingTextDemo() {
  return (
    <div className="flex min-h-48 items-center justify-center p-8">
      <MorphingText
        texts={["Design", "Create", "Build", "Ship", "Inspire"]}
        morphTime={1.5}
        coolDownTime={0.5}
      />
    </div>
  );
}

"use client";

import { useState } from "react";

import Cmp from "@/registry/origin-ui/comp-283";

export default function Demo() {
  // Bring the notification back a moment after it is dismissed, so the demo can be replayed.
  const [key, setKey] = useState(0);
  return (
    <div className="flex min-h-[64px] items-center justify-center">
      <Cmp key={key} onClose={() => setTimeout(() => setKey((k) => k + 1), 1800)} />
    </div>
  );
}

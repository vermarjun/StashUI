"use client";

import PatternWaves from "@/registry/react-bits/pattern-waves";

export default function Demo() {
  return (
    <div className="relative h-[620px] w-full overflow-hidden bg-black">
      <PatternWaves preset="silk" color="#ffffff" backgroundColor="#000000" />
    </div>
  );
}

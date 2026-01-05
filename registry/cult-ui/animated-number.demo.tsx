"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/registry/cult-ui/animated-number";

export default function Demo() {
  const [value, setValue] = useState(1234);

  const targets = [0, 999, 1234, 42000, 1000000];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-6 p-8">
      <div className="text-5xl font-bold text-white tabular-nums">
        <AnimatedNumber
          value={value}
          mass={0.8}
          stiffness={75}
          damping={15}
          precision={0}
          format={(n) => n.toLocaleString()}
        />
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {targets.map((t) => (
          <button
            key={t}
            onClick={() => setValue(t)}
            className="px-3 py-1.5 text-sm rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
          >
            {t.toLocaleString()}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

import Counter from "@/registry/react-bits/Counter";

export default function Demo() {
  const [value, setValue] = useState(8);
  const [visitors, setVisitors] = useState(48271);

  // a live-looking metric that ticks on its own
  useEffect(() => {
    const id = setInterval(
      () => setVisitors((v) => v + 7 + Math.floor(Math.random() * 60)),
      1400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12 p-8">
      <div className="flex flex-col items-center gap-3">
        <span className="text-sm font-medium tracking-wide text-muted-foreground">
          Visitors today
        </span>
        <Counter
          value={visitors}
          places={[10000, 1000, 100, 10, 1]}
          fontSize={72}
          padding={6}
          gap={6}
          textColor="var(--foreground)"
          fontWeight={700}
          gradientHeight={18}
          gradientFrom="var(--background)"
          gradientTo="transparent"
        />
      </div>
      <div className="flex items-center gap-5">
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => setValue((v) => Math.max(0, v - 1))}
          className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
        >
          <Minus className="size-4" />
        </button>
        <Counter
          value={value}
          places={[10, 1]}
          fontSize={56}
          padding={4}
          textColor="var(--foreground)"
          fontWeight={600}
          gradientFrom="var(--background)"
          gradientTo="transparent"
        />
        <button
          type="button"
          aria-label="Increase"
          onClick={() => setValue((v) => Math.min(99, v + 1))}
          className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  );
}

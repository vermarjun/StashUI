"use client";

import { useEffect, useState } from "react";

import { Progress } from "@/registry/origin-ui/progress";

export default function Demo() {
  const [value, setValue] = useState(12);

  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 12 : Math.min(100, v + 11))), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 p-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Uploading assets</span>
        <span className="tabular-nums text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}

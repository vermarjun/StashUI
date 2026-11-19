"use client";

import { useEffect, useState } from "react";
import {
  Progress,
  ProgressIndicator,
} from "@/registry/animate-ui/primitives-radix-progress";

const files = [
  { name: "design-system.fig", size: "24.8 MB", target: 100 },
  { name: "brand-assets.zip", size: "112 MB", target: 68 },
  { name: "launch-video.mp4", size: "486 MB", target: 34 },
];

export default function Demo() {
  const [values, setValues] = useState(files.map(() => 0));

  useEffect(() => {
    const id = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const t = files[i].target;
          return v >= t ? (t === 100 ? 100 : 0) : Math.min(t, v + 6 + i * 2);
        }),
      );
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-xl space-y-6 rounded-2xl border border-border bg-card p-8 shadow-xl">
      <div>
        <p className="text-lg font-semibold text-card-foreground">Uploading</p>
        <p className="text-sm text-muted-foreground">3 files to Shared Drive</p>
      </div>
      {files.map((f, i) => (
        <div key={f.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">{f.name}</span>
            <span className="text-muted-foreground tabular-nums">
              {values[i]}% &middot; {f.size}
            </span>
          </div>
          <Progress
            value={values[i]}
            className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted"
          >
            <ProgressIndicator className="h-full w-full rounded-full bg-foreground" />
          </Progress>
        </div>
      ))}
    </div>
  );
}

"use client";

import { ColourfulText } from "@/registry/inspira-react/colourful-text";

export default function ColourfulTextDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-16">
      <h1 className="text-5xl font-bold tracking-tight">
        <ColourfulText text="Hello, World!" />
      </h1>

      <p className="text-2xl font-semibold">
        <ColourfulText
          text="Build beautiful UIs"
          colors={[
            "rgb(239,68,68)",
            "rgb(249,115,22)",
            "rgb(234,179,8)",
            "rgb(34,197,94)",
            "rgb(59,130,246)",
            "rgb(168,85,247)",
          ]}
          duration={0.4}
        />
      </p>

      <p className="text-sm text-muted-foreground">
        Colors shuffle every 5 seconds.
      </p>
    </div>
  );
}

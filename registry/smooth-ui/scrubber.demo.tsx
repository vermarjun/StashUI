"use client";

import { useState } from "react";
import Scrubber from "./scrubber";

export default function ScrubberDemo() {
  const [opacity, setOpacity] = useState(0.8);
  const [radius, setRadius] = useState(24);
  const [rotation, setRotation] = useState(-8);
  const [blur, setBlur] = useState(0);

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="flex w-full max-w-2xl items-stretch gap-6">
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-border bg-muted/30">
          <div
            className="size-36 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 shadow-2xl"
            style={{
              borderRadius: radius,
              filter: `blur(${blur}px)`,
              opacity,
              transform: `rotate(${rotation}deg)`,
            }}
          />
        </div>
        <div className="flex w-64 flex-col gap-2.5 rounded-2xl border border-border bg-card p-4">
          <p className="mb-1 font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Layer · Hero shape
          </p>
          <Scrubber
            label="Opacity"
            onValueChange={setOpacity}
            value={opacity}
          />
          <Scrubber
            decimals={0}
            label="Radius"
            max={72}
            onValueChange={setRadius}
            step={1}
            value={radius}
          />
          <Scrubber
            decimals={0}
            label="Rotation"
            max={45}
            min={-45}
            onValueChange={setRotation}
            step={1}
            value={rotation}
          />
          <Scrubber
            decimals={1}
            label="Blur"
            max={12}
            onValueChange={setBlur}
            step={0.5}
            value={blur}
          />
        </div>
      </div>
    </div>
  );
}

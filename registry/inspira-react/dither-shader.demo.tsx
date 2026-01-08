"use client";

import { useState } from "react";
import { DitherShader, type DitheringMode, type ColorMode } from "@/registry/inspira-react/dither-shader";

export default function DitherShaderDemo() {
  const [ditherMode, setDitherMode] = useState<DitheringMode>("bayer");
  const [colorMode, setColorMode] = useState<ColorMode>("grayscale");

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="h-[400px] w-[600px] rounded-xl overflow-hidden border border-border">
        <DitherShader
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
          gridSize={4}
          ditherMode={ditherMode}
          colorMode={colorMode}
          contrast={1.2}
          brightness={0.05}
          objectFit="cover"
        />
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <div className="flex gap-2">
          {(["bayer", "halftone", "noise", "crosshatch"] as DitheringMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setDitherMode(mode)}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                ditherMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["grayscale", "duotone", "original", "custom"] as ColorMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setColorMode(mode)}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                colorMode === mode
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

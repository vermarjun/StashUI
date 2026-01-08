"use client";

import React, { useState } from "react";
import { ColorPicker, type ColorPickerValue } from "@/registry/inspira-react/color-picker";

export default function ColorPickerDemo() {
  const [color, setColor] = useState("#2CADF6");
  const [displayValue, setDisplayValue] = useState(color);

  function handleChange(v: ColorPickerValue) {
    setColor(v.hex);
    setDisplayValue(v.hex);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-16">
      <ColorPicker
        value={color as `#${string}`}
        type="hex"
        onValueChange={handleChange}
      >
        {/* Trigger: a coloured swatch button */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-lg border bg-card px-4 py-2 shadow-sm hover:bg-accent transition-colors"
        >
          <span
            className="inline-block size-5 rounded border"
            style={{ backgroundColor: color }}
          />
          <span className="font-mono text-sm">{displayValue}</span>
          <span className="text-xs text-muted-foreground">Click to open</span>
        </button>
      </ColorPicker>

      <p className="text-sm text-muted-foreground">
        Selected: <strong>{displayValue}</strong>
      </p>
    </div>
  );
}

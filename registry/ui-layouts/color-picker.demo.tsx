'use client';
import { useState } from "react";
import { ColorPicker } from "@/registry/ui-layouts/color-picker";

export default function Demo() {
  const [color, setColor] = useState("#6366f1");
  return (
    <div className="flex items-center justify-center p-8">
      <ColorPicker
        color={color}
        onChange={setColor}
        label="Color"
        isEyeDroppper={false}
      />
    </div>
  );
}

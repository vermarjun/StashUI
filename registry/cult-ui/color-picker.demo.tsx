"use client"

import { useState } from "react"
import { ColorPicker } from "@/registry/cult-ui/color-picker"

export default function Demo() {
  const [color, setColor] = useState("#007AFF")

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div
        className="w-24 h-24 rounded-2xl shadow-md transition-all duration-300"
        style={{ backgroundColor: color }}
      />
      <ColorPicker color={color} onChange={setColor} />
      <p className="text-sm text-muted-foreground">Selected: {color}</p>
    </div>
  )
}

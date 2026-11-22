"use client"

import { useState } from "react"

import { EmojiPicker, EmojiPickerPanel } from "./emoji-picker"

export default function EmojiPickerDemo() {
  const [value, setValue] = useState<string | null>(null)

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-6">
      <div className="w-fit overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm">
        <EmojiPicker value={value} onValueChange={setValue}>
          <EmojiPickerPanel />
        </EmojiPicker>
      </div>
      <p className="text-sm text-muted-foreground">
        Status for #design-crit:{" "}
        <span className="text-base text-foreground">{value ?? "-"}</span>
      </p>
    </div>
  )
}

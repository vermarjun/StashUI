"use client"

import { CoolMode } from "@/registry/magic-ui/cool-mode"

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-[260px]">
      <p className="text-muted-foreground text-sm select-none">
        Click &amp; hold — then drag to spray particles
      </p>
      <div className="flex gap-4">
        <CoolMode>
          <button className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:opacity-90 active:scale-95">
            Cool Mode ✨
          </button>
        </CoolMode>
        <CoolMode options={{ particle: "⭐", size: 20 }}>
          <button className="rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow transition hover:bg-muted active:scale-95">
            Stars 🌟
          </button>
        </CoolMode>
      </div>
    </div>
  )
}

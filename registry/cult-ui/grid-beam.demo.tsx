"use client"

import { GridBeam } from "@/registry/cult-ui/grid-beam"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background p-8">
      <GridBeam
        className="h-full w-full rounded-2xl border border-border"
        rows={4}
        cols={5}
        colorVariant="colorful"
        theme="dark"
        active
        breathe
        duration={3}
        strength={1}
        borderRadius={16}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Grid Beam
          </h2>
          <p className="max-w-xs text-sm text-muted-foreground">
            Glowing beams travel along a grid of intersecting lines.
          </p>
        </div>
      </GridBeam>
    </div>
  )
}

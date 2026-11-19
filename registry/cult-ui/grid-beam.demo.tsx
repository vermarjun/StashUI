"use client"

import { GridBeam } from "@/registry/cult-ui/grid-beam"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black p-6">
      <GridBeam
        className="flex h-full w-full items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950"
        rows={4}
        cols={6}
        colorVariant="colorful"
        theme="dark"
        active
        breathe
        duration={2.6}
        strength={2.6}
        borderRadius={16}
      >
        <div className="flex flex-col items-center gap-4 rounded-xl bg-neutral-950/80 px-8 py-6 text-center backdrop-blur-sm">
          <span className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-400">
            Realtime sync
          </span>
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Every edit, everywhere, instantly
          </h2>
          <p className="max-w-sm text-sm text-neutral-400">
            Changes stream across your team&apos;s devices in under 50ms, like
            light running through the grid.
          </p>
        </div>
      </GridBeam>
    </div>
  )
}

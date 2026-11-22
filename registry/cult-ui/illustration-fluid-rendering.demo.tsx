"use client"

import { FluidRendering } from "./illustration-fluid-rendering"

export default function IllustrationFluidRenderingDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-8">
      <div className="rounded-2xl border border-border bg-card/40 p-6">
        <FluidRendering className="h-auto w-[720px] max-w-full" height={313} width={720} />
      </div>
    </div>
  )
}

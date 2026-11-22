'use client'

import { AnimatedCursor } from './figma-cursor'

export default function FigmaCursorDemo() {
  return (
    <div className="relative h-[460px] w-full max-w-3xl overflow-hidden rounded-xl border border-border bg-background">
      <div className="absolute left-10 top-10 h-40 w-64 rounded-lg border border-dashed border-sky-500/60 bg-sky-500/5 p-4">
        <div className="text-xs text-muted-foreground">Frame 12 · Pricing</div>
        <div className="mt-3 h-3 w-40 rounded bg-foreground/20" />
        <div className="mt-2 h-3 w-28 rounded bg-foreground/10" />
        <div className="mt-6 h-8 w-24 rounded-md bg-sky-500/70" />
      </div>
      <div className="absolute bottom-12 right-12 h-36 w-72 rounded-lg border border-border bg-muted/40 p-4">
        <div className="text-xs text-muted-foreground">Frame 14 · Checkout</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="h-12 rounded bg-foreground/10" />
          <div className="h-12 rounded bg-foreground/10" />
          <div className="h-12 rounded bg-foreground/10" />
        </div>
      </div>
      <div className="absolute left-[42%] top-[18%]">
        <AnimatedCursor text="Maya Chen" />
      </div>
      <div className="absolute left-[18%] top-[60%]">
        <AnimatedCursor
          text="Leo Park"
          className="bg-pink-600 border-pink-400"
          color="var(--color-pink-500)"
          stroke="var(--color-pink-400)"
          x={60}
          y={-30}
          duration={5}
          delay={0.6}
        />
      </div>
      <div className="absolute right-[14%] top-[22%]">
        <AnimatedCursor
          text="Ana Ruiz"
          className="bg-emerald-600 border-emerald-400"
          color="var(--color-emerald-500)"
          stroke="var(--color-emerald-400)"
          x={-50}
          y={50}
          duration={4.6}
          delay={1.2}
        />
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import BlurText from "@/registry/react-bits/BlurText"

export default function Demo() {
  const [run, setRun] = useState(0)

  return (
    <div className="relative flex min-h-[380px] w-full flex-col items-center justify-center gap-6 p-12">
      <div key={run} className="flex flex-col items-center gap-6">
        <BlurText
          text="Design systems built to last"
          animateBy="words"
          direction="top"
          delay={150}
          className="justify-center text-5xl font-bold tracking-tight text-foreground"
        />
        <BlurText
          text="Composable. Accessible. Beautiful."
          animateBy="words"
          direction="bottom"
          delay={120}
          stepDuration={0.4}
          className="justify-center text-2xl font-medium text-muted-foreground"
        />
      </div>
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <RotateCcw className="size-3.5" />
        Replay
      </button>
    </div>
  )
}

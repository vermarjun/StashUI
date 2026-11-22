"use client"

import { useState } from "react"

import { NewIntroSequence } from "./terminal-ui"

export default function TerminalUiDemo() {
  const [run, setRun] = useState(0)

  return (
    <div className="flex min-h-[520px] w-full items-center justify-center bg-background p-6">
      <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#16151f] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-white/40">~/onboarding: zsh</span>
        </div>
        <NewIntroSequence
          key={run}
          className="h-[400px] w-[560px]"
          onComplete={() => setTimeout(() => setRun((r) => r + 1), 2500)}
        />
      </div>
    </div>
  )
}

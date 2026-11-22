"use client"

import { useState } from "react"

import { DeployGlobe, type DeployStatus } from "./illustration-globe-vercel"

const STATUSES: { value: DeployStatus; label: string }[] = [
  { value: "deploying", label: "Deploying" },
  { value: "deployed", label: "Deployed" },
  { value: "error", label: "Failed" },
]

const ACCENTS = ["#45DEC4", "#3B82F6", "#A855F7", "#F59E0B"]

export default function IllustrationGlobeVercelDemo() {
  const [status, setStatus] = useState<DeployStatus>("deployed")
  const [accent, setAccent] = useState(ACCENTS[0])

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-10">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {STATUSES.map((s) => (
          <button
            className={
              status === s.value
                ? "rounded-full bg-foreground px-3.5 py-1.5 font-mono text-background text-xs"
                : "rounded-full bg-muted px-3.5 py-1.5 font-mono text-muted-foreground text-xs hover:text-foreground"
            }
            key={s.value}
            onClick={() => setStatus(s.value)}
            type="button"
          >
            {s.label}
          </button>
        ))}
        <span className="mx-2 h-4 w-px bg-border" />
        {ACCENTS.map((c) => (
          <button
            aria-label={`Accent ${c}`}
            className="size-5 rounded-full ring-offset-2 ring-offset-background data-[active=true]:ring-2 data-[active=true]:ring-foreground"
            data-active={accent === c}
            key={c}
            onClick={() => setAccent(c)}
            style={{ background: c }}
            type="button"
          />
        ))}
      </div>
      <div className="w-full max-w-[680px]">
        <DeployGlobe
          accentColor={status === "error" ? undefined : accent}
          duration={4.5}
          status={status}
        />
      </div>
    </div>
  )
}

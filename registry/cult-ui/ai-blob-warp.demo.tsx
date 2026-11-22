"use client"

import { AiBlobWarpAvatar } from "./ai-blob-warp"

const messages = [
  {
    from: "ai",
    text: "I pulled last week's churn numbers. Three accounts downgraded after the pricing change.",
  },
  { from: "me", text: "Which plan were they on?" },
  {
    from: "ai",
    text: "All three were on Team, billed monthly. Want me to draft a win-back email?",
  },
]

export default function AiBlobWarpDemo() {
  return (
    <div className="flex min-h-[480px] w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex items-center gap-4">
          <AiBlobWarpAvatar aria-label="Assistant" className="size-16" />
          <div>
            <p className="font-medium text-foreground">Atlas</p>
            <p className="text-muted-foreground text-sm">Thinking with your data…</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {messages.map((m, i) =>
            m.from === "ai" ? (
              <div className="flex items-start gap-3" key={i}>
                <AiBlobWarpAvatar aria-hidden className="size-8 shrink-0" />
                <p className="rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-2.5 text-foreground text-sm leading-relaxed">
                  {m.text}
                </p>
              </div>
            ) : (
              <p
                className="self-end rounded-2xl rounded-tr-sm bg-foreground px-4 py-2.5 text-background text-sm"
                key={i}
              >
                {m.text}
              </p>
            )
          )}
        </div>
        <div className="flex items-center justify-center gap-6 pt-2">
          <AiBlobWarpAvatar aria-label="Warm" className="size-12" warpProps={{ colors: ["#fda4af", "#fb923c", "#f472b6", "#fecdd3"] }} />
          <AiBlobWarpAvatar aria-label="Ocean" className="size-12" warpProps={{ colors: ["#22d3ee", "#3b82f6", "#a78bfa", "#0ea5e9"] }} />
          <AiBlobWarpAvatar aria-label="Forest" className="size-12" warpProps={{ colors: ["#4ade80", "#14b8a6", "#a3e635", "#065f46"] }} />
        </div>
      </div>
    </div>
  )
}

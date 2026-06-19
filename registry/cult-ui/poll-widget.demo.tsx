"use client"

import { useState } from "react"

import {
  PollWidget,
  PollWidgetContent,
  PollWidgetOptions,
  PollWidgetOption,
  PollWidgetQuestion,
  PollWidgetResults,
  PollWidgetSubmit,
} from "@/registry/cult-ui/poll-widget"

const OPTIONS = [
  { id: "speed", label: "Faster build times" },
  { id: "dx", label: "Better DX tooling" },
  { id: "ai", label: "AI-assisted coding" },
  { id: "collab", label: "Team collaboration" },
]

const BASE_VOTES: Record<string, number> = {
  speed: 312,
  dx: 241,
  ai: 198,
  collab: 155,
}

export default function Demo() {
  const [votes, setVotes] = useState(BASE_VOTES)
  const [hasVoted, setHasVoted] = useState(false)

  function handleVote(selected: string[]) {
    setVotes((prev) => {
      const next = { ...prev }
      for (const id of selected) {
        next[id] = (next[id] ?? 0) + 1
      }
      return next
    })
    setHasVoted(true)
  }

  return (
    <div className="w-full max-w-md p-6">
      <PollWidget
        question="What would improve your workflow the most?"
        description="Pick the improvement you care about most."
        options={OPTIONS}
        votes={votes}
        hasVoted={hasVoted}
        onVote={handleVote}
        mode="inline"
        autoCollapseDelay={0}
      >
        <PollWidgetContent>
          <PollWidgetQuestion />
          <PollWidgetOptions>
            {OPTIONS.map((opt) => (
              <PollWidgetOption key={opt.id} value={opt.id} />
            ))}
          </PollWidgetOptions>
          <PollWidgetResults />
          <PollWidgetSubmit />
        </PollWidgetContent>
      </PollWidget>
    </div>
  )
}

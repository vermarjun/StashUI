"use client"

import { useState } from "react"

import { ChoicePoll } from "@/registry/cult-ui/choice-poll"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
]

const initialVotes = { react: 245, vue: 178, angular: 92, svelte: 134 }

export default function Demo() {
  const [votes, setVotes] = useState<Record<string, number>>(initialVotes)
  const [hasVoted, setHasVoted] = useState(false)

  return (
    <div className="w-full max-w-md p-6">
      <ChoicePoll.Root
        votes={votes}
        hasVoted={hasVoted}
        showResults
        onValueChange={(value) => {
          if (hasVoted) return
          const choice = Array.isArray(value) ? value[0] : value
          if (!choice) return
          setVotes((v) => ({ ...v, [choice]: (v[choice] ?? 0) + 1 }))
          setHasVoted(true)
        }}
      >
        <ChoicePoll.Header>
          <ChoicePoll.Title>What is your favorite frontend framework?</ChoicePoll.Title>
          <ChoicePoll.Description>
            Vote for the framework you enjoy working with the most.
          </ChoicePoll.Description>
        </ChoicePoll.Header>
        <ChoicePoll.Options>
          {options.map((o) => (
            <ChoicePoll.Option key={o.value} value={o.value}>
              <ChoicePoll.Indicator />
              <ChoicePoll.Label>{o.label}</ChoicePoll.Label>
              <ChoicePoll.Percentage />
            </ChoicePoll.Option>
          ))}
        </ChoicePoll.Options>
        <ChoicePoll.Footer />
      </ChoicePoll.Root>
    </div>
  )
}

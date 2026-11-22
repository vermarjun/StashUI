"use client"

import { AgentSuggestCardStack, type SuggestionItem } from "./agent-suggest-card-stack"

const suggestions: SuggestionItem[] = [
  { id: "1", title: "Update auth config", progress: 100, status: "success" },
  {
    id: "2",
    title: "Fix type errors",
    progress: 65,
    status: "mixed",
    mixedProgress: { success: 2, error: 1 },
  },
  { id: "3", title: "Add tests", progress: 0, status: "error" },
]

const SparkMark = (
  <path
    d="M8 1.5l1.6 4.4 4.4 1.6-4.4 1.6L8 13.5 6.4 9.1 2 7.5l4.4-1.6L8 1.5z"
    fill="var(--foreground)"
  />
)

export default function AgentSuggestCardStackDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <AgentSuggestCardStack
        commitButtonText="Apply changes"
        headerBadge="3"
        headerTitle="Agent suggestions"
        height={240}
        logoIcon={SparkMark}
        suggestions={suggestions}
        width={460}
      />
    </div>
  )
}

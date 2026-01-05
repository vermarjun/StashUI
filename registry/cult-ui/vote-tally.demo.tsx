"use client"

import { VoteTally } from "@/registry/cult-ui/vote-tally"

const items = [
  {
    id: "typescript",
    title: "TypeScript Support",
    description: "Full TypeScript type safety and autocompletion.",
    initialVotes: 87,
  },
  {
    id: "testing",
    title: "Automated Testing",
    description: "Built-in testing utilities and CI/CD integration.",
    initialVotes: 54,
  },
  {
    id: "docs",
    title: "Better Documentation",
    description: "Comprehensive guides and API reference docs.",
    initialVotes: 72,
  },
  {
    id: "plugins",
    title: "Plugin System",
    description: "Extensible architecture with community plugins.",
    initialVotes: 43,
  },
]

export default function Demo() {
  return (
    <div className="w-full max-w-lg p-4">
      <h2 className="text-xl font-bold mb-4">Community Requests</h2>
      <VoteTally.Root
        defaultValue={{
          typescript: 87,
          testing: 54,
          docs: 72,
          plugins: 43,
        }}
        className="flex flex-col gap-2"
      >
        {items.map((item) => (
          <VoteTally.Item
            key={item.id}
            value={item.id}
            className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
          >
            <VoteTally.Trigger className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background hover:bg-primary hover:text-primary-foreground transition-colors data-[state=voted]:bg-primary data-[state=voted]:text-primary-foreground flex-col gap-0.5">
              <span className="text-xs">▲</span>
              <VoteTally.Count className="text-xs font-medium" />
            </VoteTally.Trigger>
            <div className="flex flex-col">
              <VoteTally.Title className="font-medium text-sm">{item.title}</VoteTally.Title>
              <VoteTally.Description className="text-xs text-muted-foreground">{item.description}</VoteTally.Description>
            </div>
          </VoteTally.Item>
        ))}
      </VoteTally.Root>
    </div>
  )
}

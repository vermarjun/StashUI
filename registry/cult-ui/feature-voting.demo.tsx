"use client"

import { FeatureVoting } from "@/registry/cult-ui/feature-voting"

const features = [
  {
    id: "dark-mode",
    title: "Dark Mode",
    description: "Full dark mode support across the entire app.",
    initialVotes: 42,
  },
  {
    id: "api-integrations",
    title: "API Integrations",
    description: "Connect with third-party services seamlessly.",
    initialVotes: 31,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Native iOS and Android application.",
    initialVotes: 58,
  },
  {
    id: "export-pdf",
    title: "PDF Export",
    description: "Export any content to PDF format with one click.",
    initialVotes: 19,
  },
]

export default function Demo() {
  return (
    <div className="w-full max-w-lg p-4">
      <h2 className="text-xl font-bold mb-4">Vote for Features</h2>
      <FeatureVoting.Root
        defaultValue={{ "dark-mode": 42, "api-integrations": 31, "mobile-app": 58, "export-pdf": 19 }}
        className="flex flex-col gap-2"
      >
        {features.map((feature) => (
          <FeatureVoting.Item
            key={feature.id}
            value={feature.id}
            className="flex items-center gap-3 rounded-lg border p-3 hover:bg-accent/50 transition-colors"
          >
            <FeatureVoting.Trigger className="flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background hover:bg-primary hover:text-primary-foreground transition-colors data-[state=voted]:bg-primary data-[state=voted]:text-primary-foreground flex-col gap-0.5">
              <span className="text-xs">▲</span>
              <FeatureVoting.Count className="text-xs font-medium" />
            </FeatureVoting.Trigger>
            <div className="flex flex-col">
              <FeatureVoting.Title className="font-medium text-sm">{feature.title}</FeatureVoting.Title>
              <FeatureVoting.Description className="text-xs text-muted-foreground">{feature.description}</FeatureVoting.Description>
            </div>
          </FeatureVoting.Item>
        ))}
      </FeatureVoting.Root>
    </div>
  )
}

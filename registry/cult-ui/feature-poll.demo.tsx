"use client"

import { FeaturePoll } from "@/registry/cult-ui/feature-poll"

export default function Demo() {
  return (
    <div className="w-full max-w-md p-6">
      <FeaturePoll.Root
        votes={{ performance: 312, dx: 201, ecosystem: 145, learning: 89 }}
        hasVoted={false}
        showResults={false}
      >
        <FeaturePoll.Header>
          <FeaturePoll.Title>What matters most in a framework?</FeaturePoll.Title>
          <FeaturePoll.Description>Help us prioritize what we build next.</FeaturePoll.Description>
        </FeaturePoll.Header>
        <FeaturePoll.Options>
          <FeaturePoll.Option value="performance">
            <FeaturePoll.Indicator />
            <FeaturePoll.Label>Performance</FeaturePoll.Label>
          </FeaturePoll.Option>
          <FeaturePoll.Option value="dx">
            <FeaturePoll.Indicator />
            <FeaturePoll.Label>Developer Experience</FeaturePoll.Label>
          </FeaturePoll.Option>
          <FeaturePoll.Option value="ecosystem">
            <FeaturePoll.Indicator />
            <FeaturePoll.Label>Ecosystem & Libraries</FeaturePoll.Label>
          </FeaturePoll.Option>
          <FeaturePoll.Option value="learning">
            <FeaturePoll.Indicator />
            <FeaturePoll.Label>Learning Curve</FeaturePoll.Label>
          </FeaturePoll.Option>
        </FeaturePoll.Options>
        <FeaturePoll.Footer />
      </FeaturePoll.Root>
    </div>
  )
}

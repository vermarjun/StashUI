"use client"

import { ChoicePoll } from "@/registry/cult-ui/choice-poll"

export default function Demo() {
  return (
    <div className="w-full max-w-md p-6">
      <ChoicePoll.Root
        votes={{ react: 245, vue: 178, angular: 92, svelte: 134 }}
        hasVoted={false}
        showResults={false}
      >
        <ChoicePoll.Header>
          <ChoicePoll.Title>What is your favorite frontend framework?</ChoicePoll.Title>
          <ChoicePoll.Description>Vote for the framework you enjoy working with the most.</ChoicePoll.Description>
        </ChoicePoll.Header>
        <ChoicePoll.Options>
          <ChoicePoll.Option value="react">
            <ChoicePoll.Indicator />
            <ChoicePoll.Label>React</ChoicePoll.Label>
          </ChoicePoll.Option>
          <ChoicePoll.Option value="vue">
            <ChoicePoll.Indicator />
            <ChoicePoll.Label>Vue</ChoicePoll.Label>
          </ChoicePoll.Option>
          <ChoicePoll.Option value="angular">
            <ChoicePoll.Indicator />
            <ChoicePoll.Label>Angular</ChoicePoll.Label>
          </ChoicePoll.Option>
          <ChoicePoll.Option value="svelte">
            <ChoicePoll.Indicator />
            <ChoicePoll.Label>Svelte</ChoicePoll.Label>
          </ChoicePoll.Option>
        </ChoicePoll.Options>
      </ChoicePoll.Root>
    </div>
  )
}

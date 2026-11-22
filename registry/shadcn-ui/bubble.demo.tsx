"use client"

import * as React from "react"

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "./bubble"

export default function BubbleDemo() {
  const [liked, setLiked] = React.useState(false)
  return (
    <div className="flex h-full min-h-[560px] w-full items-center justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <img
            src="https://i.pravatar.cc/150?img=47"
            alt=""
            className="size-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">Maya Patel</p>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>

        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>Hey! Did the new onboarding flow ship?</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>
              Product wants numbers for Thursday&apos;s review.
            </BubbleContent>
          </Bubble>
        </BubbleGroup>

        <BubbleGroup>
          <Bubble align="end">
            <BubbleContent>Went live this morning 🚀</BubbleContent>
          </Bubble>
          <Bubble align="end" className="mb-3">
            <BubbleContent asChild>
              <button type="button" onClick={() => setLiked((v) => !v)}>
                Activation is up 18% vs last week, and drop-off on step 2 is
                basically gone.
              </button>
            </BubbleContent>
            {liked && (
              <BubbleReactions align="start">
                <span>🎉</span>
                <span className="text-xs text-muted-foreground">2</span>
              </BubbleReactions>
            )}
          </Bubble>
        </BubbleGroup>

        <Bubble variant="tinted">
          <BubbleContent>That&apos;s huge. Sharing it with the team now.</BubbleContent>
        </Bubble>

        <Bubble variant="outline" align="end">
          <BubbleContent>I&apos;ll send the dashboard link in a sec.</BubbleContent>
        </Bubble>

        <Bubble variant="destructive">
          <BubbleContent>Message failed to send. Tap to retry.</BubbleContent>
        </Bubble>
      </div>
    </div>
  )
}

"use client"

import { Database, Sparkles } from "lucide-react"

import { MergingBubbles } from "./merging-bubbles"

export default function MergingBubblesDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 p-8">
      <MergingBubbles
        endIcon={<Sparkles className="size-full text-foreground" strokeWidth={1.5} />}
        size="lg"
        startIcon={<Database className="size-full text-foreground" strokeWidth={1.5} />}
      />
      <div className="text-center">
        <p className="font-medium text-foreground text-lg">Your data, meet your model</p>
        <p className="mt-1 text-muted-foreground text-sm">
          Connect a Postgres database and start asking questions in plain English.
        </p>
      </div>
    </div>
  )
}

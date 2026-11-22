"use client"

import { useState } from "react"
import { FaceRating } from "./face-rating"

export default function FaceRatingDemo() {
  const [value, setValue] = useState(0)

  return (
    <div className="flex min-h-[420px] w-full items-center justify-center bg-background p-8">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-base font-semibold text-foreground">
          How was your onboarding call?
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your rating goes straight to Maya, your success manager.
        </p>
        <div className="mt-6">
          <FaceRating size="lg" value={value} onValueChange={setValue} />
        </div>
        <p className="mt-4 h-5 text-xs text-muted-foreground">
          {value > 0 ? `Thanks! You rated us ${value} of 5.` : "Hover a number to preview the mood."}
        </p>
      </div>
    </div>
  )
}

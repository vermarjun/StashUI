"use client"

import { MorphSurface } from "@/registry/cult-ui/morph-surface"

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[480px]">
      <MorphSurface
        triggerLabel="Send Feedback"
        placeholder="What's on your mind? We read every message."
        expandedWidth={360}
        expandedHeight={200}
        onSubmit={async (data) => {
          await new Promise((r) => setTimeout(r, 600))
          console.log("Feedback:", Object.fromEntries(data))
        }}
        onSuccess={() => console.log("Success!")}
      />
    </div>
  )
}

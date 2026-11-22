"use client"

import { SecurityCheckpoint } from "./security-checkpoint"

export default function SecurityCheckpointDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center p-6">
      <SecurityCheckpoint
        message="To keep your workspace safe, we're taking a few moments to verify your browser before you continue."
        subtitle="Security Checkpoint"
        title="StashUI"
      />
    </div>
  )
}

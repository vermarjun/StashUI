"use client"

import { useRef } from "react"
import { Confetti, ConfettiButton, type ConfettiRef } from "@/registry/magic-ui/confetti"

export default function Demo() {
  const confettiRef = useRef<ConfettiRef>(null)

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 min-h-[300px] w-full">
      {/* Full-viewport canvas so confetti flies freely */}
      <Confetti
        ref={confettiRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        manualstart
      />

      <p className="text-muted-foreground text-sm">Click to burst</p>

      <div className="flex gap-3">
        <ConfettiButton
          options={{ spread: 90, startVelocity: 45, particleCount: 80 }}
        >
          🎉 Confetti
        </ConfettiButton>

        <ConfettiButton
          options={{
            spread: 60,
            startVelocity: 35,
            particleCount: 60,
            colors: ["#ff0000", "#ff7700", "#ffff00"],
          }}
        >
          🔥 Fire
        </ConfettiButton>
      </div>
    </div>
  )
}

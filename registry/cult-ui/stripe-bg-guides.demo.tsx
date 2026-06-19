"use client"

import { StripeBgGuides } from "@/registry/cult-ui/stripe-bg-guides"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <StripeBgGuides
        contained
        columnCount={5}
        animated
        direction="both"
        animationDuration={62}
        glowColor="hsl(var(--accent))"
        glowOpacity={0.5}
        glowSize="12vh"
        randomize
        randomInterval={9000}
        darkMode={false}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Background Guide Lines
        </h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          Animated glowing column guides — the Stripe layout pattern.
        </p>
      </div>
    </div>
  )
}

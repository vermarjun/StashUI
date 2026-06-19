"use client"

import BlurText from "@/registry/react-bits/BlurText"

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12 min-h-[300px]">
      <BlurText
        text="Design systems built to last"
        animateBy="words"
        direction="top"
        delay={150}
        className="text-3xl font-bold text-foreground"
      />
      <BlurText
        text="Composable. Accessible. Beautiful."
        animateBy="words"
        direction="bottom"
        delay={120}
        stepDuration={0.4}
        className="text-xl font-medium text-muted-foreground"
      />
    </div>
  )
}

"use client"

import FuzzyText from "@/registry/react-bits/FuzzyText"

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12 min-h-[280px] bg-background">
      <FuzzyText
        fontSize="clamp(3rem, 10vw, 6rem)"
        fontWeight={900}
        color="#ffffff"
        baseIntensity={0.18}
        hoverIntensity={0.55}
        enableHover={true}
      >
        Fuzzy
      </FuzzyText>
      <p className="text-sm text-muted-foreground select-none">hover to intensify</p>
    </div>
  )
}

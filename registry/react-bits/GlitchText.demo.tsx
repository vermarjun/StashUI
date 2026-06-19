"use client"

import GlitchText from "@/registry/react-bits/GlitchText"

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-12 min-h-[260px] bg-background">
      <GlitchText
        speed={0.5}
        enableShadows={true}
        enableOnHover={false}
        className="text-foreground"
      >
        GLITCH
      </GlitchText>
      <GlitchText
        speed={0.8}
        enableShadows={true}
        enableOnHover={true}
        className="text-foreground"
      >
        HOVER ME
      </GlitchText>
    </div>
  )
}

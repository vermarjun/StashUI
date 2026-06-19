"use client"

import ScrollReveal from "@/registry/react-bits/ScrollReveal"

export default function Demo() {
  return (
    <div className="w-full max-w-3xl mx-auto px-8 py-16 space-y-12 bg-background">
      <ScrollReveal
        enableBlur={true}
        baseOpacity={0.08}
        baseRotation={4}
        blurStrength={5}
        containerClassName="text-foreground"
        textClassName="text-foreground"
      >
        Good design is as little design as possible. Less, but better — because it concentrates on the essential aspects.
      </ScrollReveal>
      <ScrollReveal
        enableBlur={true}
        baseOpacity={0.08}
        baseRotation={3}
        blurStrength={4}
        containerClassName="text-muted-foreground"
        textClassName="text-muted-foreground"
      >
        Scroll down to watch each word come into focus as it enters the viewport — a simple technique that guides the reader's attention.
      </ScrollReveal>
    </div>
  )
}

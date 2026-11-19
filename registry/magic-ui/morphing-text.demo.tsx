"use client"

import { MorphingText } from "@/registry/magic-ui/morphing-text"

export default function Demo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center px-6 text-foreground">
      <MorphingText
        className="h-28 text-[88px] md:h-32 lg:text-[112px]"
        texts={["Design", "Prototype", "Iterate", "Ship it", "Repeat"]}
      />
    </div>
  )
}

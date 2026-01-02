"use client"

import { MorphingText } from "@/registry/magic-ui/morphing-text"

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[120px] bg-white">
      <MorphingText
        texts={["Hello World", "Magic UI", "Morphing Text", "Beautiful", "Animated"]}
      />
    </div>
  )
}

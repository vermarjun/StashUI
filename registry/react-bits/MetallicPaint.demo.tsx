"use client"

import MetallicPaint from "@/registry/react-bits/MetallicPaint"

export default function Demo() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <MetallicPaint
        imageSrc="https://picsum.photos/seed/metallic/600/600"
        speed={0.3}
        scale={4}
        brightness={2}
        liquid={0.75}
        mouseAnimation={false}
      />
    </div>
  )
}

"use client"

import { ScrollVelocity } from "@/registry/react-bits/ScrollVelocity"

export default function Demo() {
  return (
    <div className="w-full py-16 bg-background overflow-hidden">
      <ScrollVelocity
        texts={[
          "Components • Animations • Design •",
          "Open Source • Accessible • Minimal •",
        ]}
        velocity={80}
        className="text-foreground"
        damping={50}
        stiffness={400}
        numCopies={6}
      />
    </div>
  )
}

"use client"

import FallingText from "@/registry/react-bits/FallingText"

export default function Demo() {
  return (
    <div className="w-full h-[420px] bg-background">
      <FallingText
        text="Hover to drop each word with physics-based gravity"
        highlightWords={["physics-based"]}
        trigger="hover"
        gravity={1}
        fontSize="1.35rem"
        backgroundColor="transparent"
        wireframes={false}
        mouseConstraintStiffness={0.2}
      />
    </div>
  )
}

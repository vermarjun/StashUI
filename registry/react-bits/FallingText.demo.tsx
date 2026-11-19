"use client"

import FallingText from "@/registry/react-bits/FallingText"

export default function Demo() {
  return (
    <div className="mx-auto h-[520px] w-full max-w-4xl px-6 pt-16 text-foreground">
      <FallingText
        text="Click anywhere and every word drops with real physics-based gravity. Then grab one and fling it around."
        highlightWords={["physics-based", "gravity.", "fling"]}
        trigger="click"
        gravity={0.7}
        fontSize="2.6rem"
        backgroundColor="transparent"
        wireframes={false}
        mouseConstraintStiffness={0.9}
      />
    </div>
  )
}

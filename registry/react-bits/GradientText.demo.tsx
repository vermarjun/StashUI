"use client"

import GradientText from "@/registry/react-bits/GradientText"

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12 min-h-[280px] bg-background">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF", "#5227FF"]}
        animationSpeed={6}
        direction="horizontal"
        yoyo={true}
        className="text-4xl font-extrabold tracking-tight"
      >
        Animated Gradient
      </GradientText>
      <GradientText
        colors={["#06b6d4", "#a855f7", "#ec4899", "#06b6d4"]}
        animationSpeed={4}
        direction="diagonal"
        showBorder={true}
        className="text-xl font-semibold px-4 py-2"
      >
        With border
      </GradientText>
    </div>
  )
}

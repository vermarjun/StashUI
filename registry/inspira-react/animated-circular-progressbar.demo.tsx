"use client"

import { useEffect, useState } from "react"
import { AnimatedCircularProgressBar } from "@/registry/inspira-react/animated-circular-progressbar"

export default function AnimatedCircularProgressBarDemo() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) return 0
        return prev + 5
      })
    }, 300)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex min-h-[300px] flex-wrap items-center justify-center gap-8 p-8">
      <AnimatedCircularProgressBar
        value={value}
        max={100}
        gaugePrimaryColor="rgb(79 70 229)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        duration={0.3}
      />
      <AnimatedCircularProgressBar
        value={65}
        max={100}
        gaugePrimaryColor="rgb(16 185 129)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        duration={1}
      />
      <AnimatedCircularProgressBar
        value={30}
        max={100}
        gaugePrimaryColor="rgb(245 158 11)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        circleStrokeWidth={8}
        duration={1}
      />
    </div>
  )
}

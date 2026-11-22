"use client"

import { Children } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const CIRCLING_KEYFRAMES = `@keyframes circling {
  0% { transform: rotate(calc(var(--circling-direction, 1) * (var(--circling-offset) * 1deg))) translate(calc(var(--circling-radius) * 1px), 0) rotate(calc(var(--circling-direction, 1) * (var(--circling-offset) * -1deg))); }
  100% { transform: rotate(calc(var(--circling-direction, 1) * (360deg + (var(--circling-offset) * 1deg)))) translate(calc(var(--circling-radius) * 1px), 0) rotate(calc(var(--circling-direction, 1) * (-360deg + (var(--circling-offset) * -1deg)))); }
}`

type CirclingElementsProps = {
  children: React.ReactNode
  radius?: number
  duration?: number // in seconds
  easing?: string
  direction?: "normal" | "reverse"
  className?: string
  pauseOnHover?: boolean
}

const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius = 100,
  duration = 10,
  easing = "linear",
  direction = "normal",
  className,
  pauseOnHover = false,
}) => {
  return (
    <div className={cn("relative z-0 group/circling", className)}>
      <style>{CIRCLING_KEYFRAMES}</style>
      {Children.map(children, (child, index) => {
        const offset = (index * 360) / Children.count(children)

        const animationProps = {
          "--circling-duration": duration,
          "--circling-radius": radius,
          "--circling-offset": offset,
          "--circling-direction": direction === "reverse" ? -1 : 1,
          animation: `circling ${duration}s ${easing} infinite`,
          animationName: "circling",
          animationDuration: `${duration}s`,
          animationTimingFunction: easing,
          animationIterationCount: "infinite",
        } as React.CSSProperties

        return (
          <motion.div
            key={index}
            style={animationProps}
            className={cn(
              "transform-gpu animate-circling absolute -translate-x-1/2 -translate-y-1/2",
              pauseOnHover &&
                "group-hover/circling:![animation-play-state:paused]"
            )}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

export default CirclingElements

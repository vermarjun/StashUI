"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface LogoOrigamiProps {
  duration?: number
  delay?: number
  className?: string
  children?: ReactNode[]
}

export function LogoOrigami({
  duration = 1.5,
  delay = 2.5,
  className,
  children = [],
}: LogoOrigamiProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = children.length || 1

  useEffect(() => {
    if (count <= 1) return
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count)
    }, delay * 1000)
    return () => clearInterval(id)
  }, [count, delay])

  const current = children[activeIndex % count]
  const next = children[(activeIndex + 1) % count]

  return (
    <div
      style={{
        transform: "rotateY(-20deg)",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "border-background/75 bg-background relative z-0 h-44 w-60 shrink-0 rounded-xl border",
        className,
      )}
    >
      {/* Static upper part (shows "next" logo top half) */}
      <div
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
          zIndex: -999,
          backfaceVisibility: "hidden",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {next}
      </div>

      {/* Static lower part (shows "current" logo bottom half) */}
      <div
        style={{
          clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
          zIndex: -999,
          backfaceVisibility: "hidden",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {current}
      </div>

      {/* Upper flip (current flipping away) */}
      <motion.div
        key={`upper-${activeIndex}`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
          zIndex: -activeIndex,
          backfaceVisibility: "hidden",
          y: "-50%",
          x: "-50%",
        }}
        initial={{ rotateX: "0deg" }}
        animate={{ rotateX: "-180deg" }}
        exit={{ rotateX: "-180deg" }}
        transition={{ duration, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2"
      >
        {current}
      </motion.div>

      {/* Lower flip (next flipping in) */}
      <motion.div
        key={`lower-${(activeIndex + 1) * 2}`}
        style={{
          clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
          zIndex: activeIndex,
          backfaceVisibility: "hidden",
          y: "-50%",
          x: "-50%",
        }}
        initial={{ rotateX: "180deg" }}
        animate={{ rotateX: "0deg" }}
        exit={{ rotateX: "0deg" }}
        transition={{ duration, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2"
      >
        {next}
      </motion.div>

      {/* Center divider */}
      <hr
        style={{ transform: "translateZ(1px)" }}
        className="absolute top-1/2 right-[15px] left-4 -translate-y-1/2 border-t-2 border-neutral-800"
      />
    </div>
  )
}

interface LogoOrigamiItemProps {
  className?: string
  children?: ReactNode
}

export function LogoOrigamiItem({ className, children }: LogoOrigamiItemProps) {
  return (
    <div
      className={cn(
        "grid h-36 w-52 place-content-center rounded-lg bg-neutral-700 text-6xl text-neutral-50",
        className,
      )}
    >
      {children}
    </div>
  )
}

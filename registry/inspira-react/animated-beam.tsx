"use client"

import { useEffect, useId, useState, type RefObject } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#FFAA40",
  gradientStopColor = "#9C40FF",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const [isVertical, setIsVertical] = useState(false)
  const [isRightToLeft, setIsRightToLeft] = useState(false)
  const [isBottomToTop, setIsBottomToTop] = useState(false)

  const x1 = reverse
    ? isRightToLeft ? "10%; 110%;" : "90%; -10%;"
    : isRightToLeft ? "90%; -10%;" : "10%; 110%;"

  const x2 = reverse
    ? isRightToLeft ? "0%; 100%;" : "100%; 0%;"
    : isRightToLeft ? "100%; 0%;" : "0%; 100%;"

  const y1 = reverse
    ? isBottomToTop ? "10%; 110%;" : "90%; -10%;"
    : isBottomToTop ? "90%; -10%;" : "10%; 110%;"

  const y2 = reverse
    ? isBottomToTop ? "0%; 100%;" : "100%; 0%;"
    : isBottomToTop ? "100%; 0%;" : "0%; 100%;"

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset
        const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset

        setIsVertical(Math.abs(endY - startY) > Math.abs(endX - startX))
        setIsRightToLeft(endX < startX)
        setIsBottomToTop(endY < startY)

        const controlY = startY - curvature
        const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`
        setPathD(d)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      updatePath()
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    updatePath()

    return () => resizeObserver.disconnect()
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  const gradientCoords = isVertical
    ? {
        x1: ["0%", "0%"],
        x2: ["0%", "0%"],
        y1: y1.split(";").map((s) => s.trim()).filter(Boolean),
        y2: y2.split(";").map((s) => s.trim()).filter(Boolean),
      }
    : {
        x1: x1.split(";").map((s) => s.trim()).filter(Boolean),
        x2: x2.split(";").map((s) => s.trim()).filter(Boolean),
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute top-0 left-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={gradientCoords}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  )
}

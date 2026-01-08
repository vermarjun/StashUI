"use client"

import { cn } from "@/lib/utils"

interface AnimatedCircularProgressBarProps {
  max?: number
  value?: number
  min?: number
  gaugePrimaryColor?: string
  gaugeSecondaryColor?: string
  className?: string
  circleStrokeWidth?: number
  showPercentage?: boolean
  duration?: number
}

export function AnimatedCircularProgressBar({
  max = 100,
  value = 0,
  min = 0,
  gaugePrimaryColor = "rgb(79 70 229)",
  gaugeSecondaryColor = "rgba(0, 0, 0, 0.1)",
  className,
  circleStrokeWidth = 10,
  showPercentage = true,
  duration = 1,
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 45
  const percentPx = circumference / 100
  const currentPercent = ((value - min) / (max - min)) * 100

  const primaryDashArray = `${currentPercent * percentPx}px ${circumference}px`
  // Secondary arc covers the gap (90 - currentPercent)
  const secondaryPercent = Math.max(0, 90 - currentPercent)
  const secondaryDashArray = `${secondaryPercent * percentPx}px ${circumference}px`

  // Primary starts at -90deg
  const primaryRotation = -90
  // Secondary is inverted, starts from the tail end
  const secondaryRotation = `rotate(calc(1turn - 90deg))`

  return (
    <div
      className={cn("relative size-40 text-2xl font-semibold", className)}
      style={
        {
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": 5,
          "--percent-to-deg": "3.6deg",
          "--duration": `${duration}s`,
          "--primary-color": gaugePrimaryColor,
          "--secondary-color": gaugeSecondaryColor,
        } as React.CSSProperties
      }
    >
      <svg
        fill="none"
        className="size-full"
        strokeWidth="2"
        viewBox="0 0 100 100"
      >
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth={circleStrokeWidth}
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={gaugeSecondaryColor}
            fill="none"
            style={{
              strokeDasharray: secondaryDashArray,
              transform: secondaryRotation,
              transformOrigin: "50px 50px",
              transition: `stroke-dasharray ${duration}s ease`,
            }}
          />
        )}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth={circleStrokeWidth}
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={gaugePrimaryColor}
          fill="none"
          style={{
            strokeDasharray: primaryDashArray,
            transform: `rotate(${primaryRotation}deg)`,
            transformOrigin: "50px 50px",
            transition: `stroke-dasharray ${duration}s ease`,
          }}
        />
      </svg>
      {showPercentage && (
        <span className="absolute inset-0 m-auto flex size-fit items-center justify-center">
          {Math.round(currentPercent)}%
        </span>
      )}
    </div>
  )
}

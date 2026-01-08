"use client"

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface LiquidGlassProps {
  radius?: number
  border?: number
  lightness?: number
  displace?: number
  blend?: string
  xChannel?: "R" | "G" | "B"
  yChannel?: "R" | "G" | "B"
  alpha?: number
  blur?: number
  rOffset?: number
  gOffset?: number
  bOffset?: number
  scale?: number
  frost?: number
  className?: string
  containerClass?: string
  children?: ReactNode
}

export function LiquidGlass({
  radius = 16,
  border = 0.07,
  lightness = 50,
  displace,
  blend = "difference",
  xChannel = "R",
  yChannel = "B",
  alpha = 0.93,
  blur = 11,
  rOffset = 0,
  gOffset = 10,
  bOffset = 20,
  scale = -180,
  frost = 0.05,
  className,
  containerClass,
  children,
}: LiquidGlassProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      let width = 0
      let height = 0
      if (entry.borderBoxSize?.length) {
        width = entry.borderBoxSize[0].inlineSize
        height = entry.borderBoxSize[0].blockSize
      } else if (entry.contentRect) {
        width = entry.contentRect.width
        height = entry.contentRect.height
      }
      setDimensions({ width, height })
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { width, height } = dimensions
  const borderPx = Math.min(width, height) * (border * 0.5)
  const yBorderPx = Math.min(width, height) * (border * 0.5)

  const displacementSvg = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0000"/>
          <stop offset="100%" stopColor="red"/>
        </linearGradient>
        <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0000"/>
          <stop offset="100%" stopColor="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black"></rect>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red)" />
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#blue)" style="mix-blend-mode: ${blend}" />
      <rect
        x="${borderPx}"
        y="${yBorderPx}"
        width="${width - borderPx * 2}"
        height="${height - yBorderPx * 2}"
        rx="${radius}"
        fill="hsl(0 0% ${lightness}% / ${alpha})"
        style="filter:blur(${blur}px)"
      />
    </svg>
  `

  const displacementDataUri = `data:image/svg+xml,${encodeURIComponent(displacementSvg)}`

  const baseStyle: CSSProperties = {
    "--frost": frost,
    borderRadius: `${radius}px`,
  } as CSSProperties

  return (
    <div
      ref={rootRef}
      style={baseStyle}
      className={cn("liquid-glass-effect", containerClass)}
    >
      <div className={cn("liquid-glass-slot", className)}>
        {children}
      </div>

      <svg
        className="liquid-glass-filter"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="displacementFilter" colorInterpolationFilters="sRGB">
            <feImage
              x="0"
              y="0"
              width="100%"
              height="100%"
              href={displacementDataUri}
              result="map"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              scale={scale + rOffset}
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              result="red"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              scale={scale + gOffset}
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
              result="green"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              xChannelSelector={xChannel}
              yChannelSelector={yChannel}
              scale={scale + bOffset}
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
              result="blue"
            />
            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            {displace !== undefined && <feGaussianBlur stdDeviation={displace} />}
          </filter>
        </defs>
      </svg>

      <style>{`
        .liquid-glass-effect {
          position: fixed;
          display: block;
          opacity: 1;
          border-radius: inherit;
          backdrop-filter: url(#displacementFilter);
          background: light-dark(hsl(0 0% 100% / var(--frost, 0)), hsl(0 0% 0% / var(--frost, 0)));
          box-shadow:
            0 0 2px 1px light-dark(color-mix(in oklch, canvasText, #0000 85%), color-mix(in oklch, canvasText, #0000 90%)) inset,
            0 0 10px 4px light-dark(color-mix(in oklch, canvasText, #0000 90%), color-mix(in oklch, canvasText, #0000 95%)) inset,
            0px 4px 16px rgba(17,17,26,0.05),
            0px 8px 24px rgba(17,17,26,0.05),
            0px 16px 56px rgba(17,17,26,0.05),
            0px 4px 16px rgba(17,17,26,0.05) inset,
            0px 8px 24px rgba(17,17,26,0.05) inset,
            0px 16px 56px rgba(17,17,26,0.05) inset;
        }
        .liquid-glass-slot {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: inherit;
        }
        .liquid-glass-filter {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

"use client"

import { useState, useRef, useCallback, type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LinkPreviewProps {
  className?: string
  linkClass?: string
  width?: number
  height?: number
  isStatic?: boolean
  imageSrc?: string
  url?: string
  children?: ReactNode
}

export function LinkPreview({
  className,
  linkClass,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
  url = "",
  children,
}: LinkPreviewProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasPopped, setHasPopped] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const previewRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  const previewSrc = isStatic
    ? imageSrc
    : (() => {
        const params = new URLSearchParams({
          url: url,
          screenshot: "true",
          meta: "false",
          embed: "screenshot.url",
          colorScheme: "light",
          "viewport.isMobile": "true",
          "viewport.deviceScaleFactor": "1",
          "viewport.width": String(width * 3),
          "viewport.height": String(height * 3),
        })
        return `https://api.microlink.io/?${params.toString()}`
      })()

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  const showPreview = useCallback(() => {
    setIsVisible(true)
    setTimeout(() => setHasPopped(true), 50)
  }, [])

  const hidePreview = useCallback(() => {
    setIsVisible(false)
    setHasPopped(false)
  }, [])

  const getPreviewStyle = (): CSSProperties => {
    const offset = 20
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1024

    let x = mousePos.x - width / 2
    x = Math.min(Math.max(0, x), viewportWidth - width)

    const linkRect = linkRef.current?.getBoundingClientRect()
    const y = linkRect ? linkRect.top - height - offset : 0

    return {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: `${width}px`,
      height: `${height}px`,
    }
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <a
        ref={linkRef}
        href={url}
        className={cn("text-black dark:text-white", linkClass)}
        onMouseMove={handleMouseMove}
        onMouseEnter={showPreview}
        onMouseLeave={hidePreview}
      >
        {children}
      </a>

      {isVisible && (
        <div
          ref={previewRef}
          className="pointer-events-none absolute z-50"
          style={getPreviewStyle()}
        >
          <div
            className={cn(
              "overflow-hidden rounded-xl shadow-xl",
              hasPopped && "animate-[pop_1000ms_ease_forwards]",
              !isStatic && "will-change-transform",
            )}
          >
            <div className="block rounded-xl border-2 border-transparent bg-white p-1 shadow-lg dark:bg-gray-900">
              <img
                src={previewSrc}
                width={width}
                height={height}
                className="size-full rounded-lg object-cover"
                style={{ width: `${width}px`, height: `${height}px` }}
                alt="preview"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pop {
          0% { transform: scale3d(0.26, 0.26, 1); }
          25% { transform: scale3d(1.1, 1.1, 1); }
          65% { transform: scale3d(0.98, 0.98, 1); }
          100% { transform: scale3d(1, 1, 1); }
        }
      `}</style>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface CardItem {
  logo: string
}

interface AnimateGridProps {
  className?: string
  textGlowStartColor?: string
  textGlowEndColor?: string
  perspective?: number
  cards: CardItem[]
  rotateX?: number
  rotateY?: number
  renderCard?: (logo: string, index: number) => React.ReactNode
}

export function AnimateGrid({
  className,
  textGlowStartColor = "#38ef7d80",
  textGlowEndColor = "#38ef7d",
  perspective = 600,
  rotateX = -1,
  rotateY = -15,
  cards,
  renderCard,
}: AnimateGridProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  function adjacentCardItems(i: number): number[] {
    return [i - 1, i + 1, i - 4, i + 4].filter((index) => {
      if (index < 0 || index > 15) return false
      if (i % 4 === 0 && index === i - 1) return false
      if (i % 4 === 3 && index === i + 1) return false
      return true
    })
  }

  useEffect(() => {
    const styleEl = document.createElement("style")
    styleEl.textContent = `
      @keyframes card-glow {
        0% { filter: drop-shadow(0px 0px 2px ${textGlowStartColor}); }
        100% { filter: drop-shadow(0px 1px 8px ${textGlowEndColor}); }
      }
      @keyframes card-glow-small {
        0% { filter: drop-shadow(0px 0px 2px rgba(56, 239, 125, 0.1)); }
        100% { filter: drop-shadow(0px 1px 4px rgba(56, 239, 125, 0.5)); }
      }
    `
    document.head.appendChild(styleEl)
    return () => document.head.removeChild(styleEl)
  }, [textGlowStartColor, textGlowEndColor])

  useEffect(() => {
    const cleanups: (() => void)[] = []

    cardRefs.current.forEach((el, i) => {
      if (!el) return

      const adjacentIndices = adjacentCardItems(i)
      let debounceTimer: ReturnType<typeof setTimeout> | null = null

      const removeClasses = () => {
        el.style.transform = ""
        el.style.animation = ""
        el.style.border = "1px solid transparent"
        el.style.backgroundColor = ""
        adjacentIndices.forEach((idx) => {
          const adj = cardRefs.current[idx]
          if (adj) {
            adj.style.transform = ""
            adj.style.animation = ""
            adj.style.border = "1px solid transparent"
          }
        })
      }

      const onEnter = () => {
        if (debounceTimer) clearTimeout(debounceTimer)
        el.style.transform = "scale(1.15) translateX(-20px) translateY(-20px) translateZ(15px)"
        el.style.animation = "card-glow 1.5s alternate infinite ease-in-out"
        el.style.border = "1px solid rgba(0, 193, 106, 0.5)"
        el.style.backgroundColor = "white"
        adjacentIndices.forEach((idx) => {
          const adj = cardRefs.current[idx]
          if (adj) {
            adj.style.transform = "scale(1.05) translateX(-5px) translateY(-5px) translateZ(0)"
            adj.style.animation = "card-glow-small 1.5s alternate infinite ease-in-out"
            adj.style.border = "1px solid rgba(0, 193, 106, 0.3)"
          }
        })
      }

      const onLeave = () => {
        if (debounceTimer) clearTimeout(debounceTimer)
        debounceTimer = setTimeout(removeClasses, 200)
      }

      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)

      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
        if (debounceTimer) clearTimeout(debounceTimer)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [cards.length])

  const cols = cards.length < 4 ? cards.length : 4

  return (
    <div className={cn("relative block", className)}>
      <div
        style={{
          transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
        className="relative w-full max-w-full items-center justify-center"
      >
        {cards.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el
            }}
            className="block rounded border border-transparent px-3 py-5 transition-all duration-200"
            style={{
              zIndex: index + 1,
              boxShadow:
                "2px 2px 5px rgba(217, 251, 232, 0.5), 3px 3px 10px rgba(217, 251, 232, 0.5), 6px 6px 20px rgba(217, 251, 232, 0.1)",
            }}
          >
            {renderCard ? renderCard(item.logo, index) : (
              <div className="flex items-center justify-center opacity-70 transition-opacity duration-200 hover:opacity-100">
                {item.logo}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

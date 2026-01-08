"use client"

import { useCallback, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

interface TooltipItem {
  id: number
  name: string
  designation: string
  image: string
}

interface AnimatedTooltipProps {
  items: TooltipItem[]
}

export function AnimatedTooltip({ items }: AnimatedTooltipProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const mouseXRef = useRef<number>(0)
  const [transform, setTransform] = useState({ rotation: 0, translation: 0 })

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>, itemId: number) => {
    setHoveredIndex(itemId)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const halfWidth = rect.width / 2
    const x = e.clientX - rect.left - halfWidth
    mouseXRef.current = x
    setTransform({
      rotation: (x / 100) * 50,
      translation: (x / 100) * 50,
    })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const halfWidth = rect.width / 2
    const x = e.clientX - rect.left - halfWidth
    mouseXRef.current = x
    setTransform({
      rotation: (x / 100) * 50,
      translation: (x / 100) * 50,
    })
  }, [])

  return (
    <div className="flex flex-row items-center">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative -mr-4"
          onMouseEnter={(e) => handleMouseEnter(e, item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 10 }}
                style={{
                  translateX: `${transform.translation}px`,
                  rotate: `${transform.rotation}deg`,
                }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs whitespace-nowrap shadow-xl"
              >
                <div className="absolute right-1/2 -bottom-px z-30 me-1 h-px w-2/5 translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-1/2 z-30 ms-1 h-px w-2/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-white">{item.name}</div>
                <div className="text-xs text-white/80">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <img
            src={item.image}
            alt={item.name}
            className="relative m-0 size-14 rounded-full border-2 border-white object-cover object-top p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}

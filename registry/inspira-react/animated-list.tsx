"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

interface AnimatedListProps {
  className?: string
  delay?: number
  children: React.ReactNode[]
}

export function AnimatedList({ className, delay = 1000, children }: AnimatedListProps) {
  const [displayedItems, setDisplayedItems] = useState<{ node: React.ReactNode; id: string }[]>([])
  const nextIndex = useRef(0)
  const items = children

  useEffect(() => {
    if (!items.length) return

    let active = true

    async function startLoop() {
      // Fill initial
      for (let i = 0; i < items.length && active; i++) {
        await wait(delay)
        if (!active) break
        setDisplayedItems((prev) => [
          ...prev,
          { node: items[nextIndex.current], id: `${nextIndex.current}-${Date.now()}` },
        ])
        nextIndex.current = (nextIndex.current + 1) % items.length
      }

      // Rolling loop
      while (active) {
        await wait(delay)
        if (!active) break
        setDisplayedItems((prev) => {
          const next = prev.slice(1)
          next.push({ node: items[nextIndex.current], id: `${nextIndex.current}-${Date.now()}` })
          return next
        })
        nextIndex.current = (nextIndex.current + 1) % items.length
      }
    }

    startLoop()

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay])

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="flex flex-col-reverse items-center gap-3">
        <AnimatePresence>
          {displayedItems.map((data) => (
            <motion.div
              key={data.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 40 }}
              className="mx-auto w-full"
            >
              {data.node}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

interface NotificationProps {
  name?: string
  description?: string
  time?: string
  icon?: string
  color?: string
}

export function Notification({
  name = "",
  description = "",
  time = "",
  icon = "",
  color = "",
}: NotificationProps) {
  return (
    <div className="relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl bg-white p-4 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transition-all duration-200 ease-in-out hover:scale-[103%] dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]">
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-sm font-normal dark:text-white/60">{description}</p>
        </div>
      </div>
    </div>
  )
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

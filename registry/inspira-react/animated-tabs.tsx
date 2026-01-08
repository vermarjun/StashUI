"use client"

import { useId, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

export interface AnimatedTab {
  title: string
  value: string
  panelClassName?: string
  content?: React.ReactNode
}

interface AnimatedTabsProps {
  tabs: AnimatedTab[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}

export function AnimatedTabs({
  tabs,
  value: controlledValue,
  defaultValue,
  onValueChange,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: AnimatedTabsProps) {
  const id = useId()
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? tabs[0]?.value ?? ""
  )
  const selectedValue = isControlled ? controlledValue : internalValue
  const [hovering, setHovering] = useState(false)

  const activeTab = tabs.find((t) => t.value === selectedValue) ?? tabs[0] ?? null

  // Stacked tabs: active first
  const stackedTabs = [
    ...tabs.filter((t) => t.value === selectedValue),
    ...tabs.filter((t) => t.value !== selectedValue),
  ]

  const handleSelect = (tab: AnimatedTab) => {
    if (!isControlled) setInternalValue(tab.value)
    onValueChange?.(tab.value)
  }

  return (
    <div
      className="flex h-full w-full flex-col"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Tab bar */}
      <div
        className={cn(
          "relative flex w-full max-w-full shrink-0 flex-row items-center justify-start overflow-auto [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [perspective:1000px] [scrollbar-width:none] sm:overflow-visible [&::-webkit-scrollbar]:hidden",
          containerClassName
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleSelect(tab)}
            style={{ transformStyle: "preserve-3d" }}
            className={cn("relative rounded-full px-4 py-2", tabClassName)}
          >
            {activeTab?.value === tab.value && (
              <motion.div
                layoutId={`animated-tabs-pill-${id}`}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block text-black dark:text-white">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Content stack */}
      <div className="relative mt-24 min-h-0 flex-1">
        <div className="relative h-full w-full">
          {stackedTabs.map((tab, idx) => {
            const isActive = tab.value === (stackedTabs[0]?.value ?? "")
            return (
              <motion.div
                key={tab.value}
                layoutId={`animated-tabs-panel-${id}-${tab.value}`}
                style={{
                  scale: 1 - idx * 0.1,
                  top: hovering ? `${idx * -50}px` : "0px",
                  willChange: "transform, top",
                  zIndex: -idx,
                  opacity: idx < 3 ? 1 - idx * 0.1 : 0,
                }}
                animate={{ y: isActive ? [0, 40, 0] : 0 }}
                className={cn(
                  "absolute top-0 left-0 h-full w-full will-change-transform",
                  contentClassName
                )}
              >
                {tab.content}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

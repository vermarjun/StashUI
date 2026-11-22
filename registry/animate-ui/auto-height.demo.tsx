"use client"

import * as React from "react"
import { AutoHeight } from "./auto-height"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"

const SHORT =
  "Release 4.2 ships offline mode, a faster editor and a reworked sharing dialog."
const LONG = [
  "Release 4.2 ships offline mode, a faster editor and a reworked sharing dialog.",
  "Offline mode keeps your last 30 documents on the device and syncs every change the moment you reconnect, with conflicts resolved line by line.",
  "The editor now opens large files three times faster, and sharing lets you invite a whole team with one link that expires when you choose.",
]

const swap = {
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(4px)" },
  transition: { duration: 0.4, ease: "easeInOut" },
} as const

export default function AutoHeightDemo() {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <AutoHeight
        deps={[expanded]}
        className="w-full rounded-xl border bg-card p-4 text-sm"
      >
        <AnimatePresence mode="wait" initial={false}>
          {expanded ? (
            <motion.div key="long" className="flex flex-col gap-2" {...swap}>
              {LONG.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>
          ) : (
            <motion.p key="short" {...swap}>
              {SHORT}
            </motion.p>
          )}
        </AnimatePresence>
      </AutoHeight>
      <Button
        variant="outline"
        size="sm"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Show less" : "Show more"}
      </Button>
    </div>
  )
}

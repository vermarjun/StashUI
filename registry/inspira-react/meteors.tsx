"use client"

import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface MeteorsProps {
  count?: number
  className?: string
}

export function Meteors({ count = 20, className }: MeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
        animationDelay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
        animationDuration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
      })),
    [count],
  )

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={`meteor-${meteor.id}`}
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
          className={cn(
            "meteor-effect absolute h-0.5 w-0.5 rotate-45 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-[50%] before:transform",
            "before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className,
          )}
        />
      ))}
      <style>{`
        @keyframes meteor {
          0% { transform: rotate(215deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-500px); opacity: 0; }
        }
        .meteor-effect {
          animation: meteor 5s linear infinite;
        }
      `}</style>
    </>
  )
}

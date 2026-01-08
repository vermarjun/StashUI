"use client"

import { type ReactNode, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  repeat?: number
  children?: ReactNode
  style?: CSSProperties
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  style,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex gap-[--gap] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      style={style}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          style={{ animationDirection: reverse ? "reverse" : "normal" }}
          className={cn(
            "flex shrink-0 justify-around gap-[--gap]",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row",
            pauseOnHover ? "group-hover:[animation-play-state:paused]" : "",
          )}
        >
          {children}
        </div>
      ))}

      <style>{`
        .animate-marquee {
          animation: marquee var(--duration) linear infinite;
          animation-direction: reverse;
        }
        .animate-marquee-vertical {
          animation: marquee-vertical var(--duration) linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - var(--gap))); }
        }
      `}</style>
    </div>
  )
}

interface ReviewCardProps {
  img: string
  name: string
  username: string
  body: string
}

export function ReviewCard({ img, name, username, body }: ReviewCardProps) {
  return (
    <figure className="relative w-64 cursor-pointer overflow-hidden rounded-xl border border-gray-950/10 bg-gray-950/[.01] p-4 hover:bg-gray-950/[.05] dark:border-gray-50/10 dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]">
      <div className="flex flex-row items-center gap-2">
        <img src={img} className="rounded-full" width={32} height={32} alt="" />
        <div className="flex flex-col">
          <span className="text-sm font-medium dark:text-white">{name}</span>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

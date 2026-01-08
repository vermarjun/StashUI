"use client"

import { AnimatedTooltip } from "@/registry/inspira-react/animated-tooltip"

const people = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "Frontend Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    designation: "CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Priya Patel",
    designation: "Product Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Alex Rivera",
    designation: "Full Stack Dev",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Emma Wilson",
    designation: "UX Researcher",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  },
]

export default function AnimatedTooltipDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8">
      <p className="text-sm text-gray-500 dark:text-gray-400">Hover over the avatars</p>
      <AnimatedTooltip items={people} />
    </div>
  )
}

"use client"

import { AnimatedList, Notification } from "@/registry/inspira-react/animated-list"

const notifications = [
  { name: "Payment received", description: "$250 from Alice", time: "just now", icon: "💸", color: "#00C9A7" },
  { name: "New follower", description: "Bob started following you", time: "5m ago", icon: "👤", color: "#FFB800" },
  { name: "New message", description: "Carol: Hey, how are you?", time: "10m ago", icon: "💬", color: "#FF3D71" },
  { name: "Order shipped", description: "Your order is on its way", time: "1h ago", icon: "📦", color: "#1E86FF" },
  { name: "Meeting reminder", description: "Team sync in 30 minutes", time: "25m ago", icon: "📅", color: "#A855F7" },
]

export default function AnimatedListDemo() {
  return (
    <div className="flex min-h-[400px] items-center justify-center overflow-hidden bg-white p-8 dark:bg-gray-950">
      <AnimatedList delay={1500} className="w-full max-w-[400px]">
        {notifications.map((n, i) => (
          <Notification key={i} {...n} />
        ))}
      </AnimatedList>
    </div>
  )
}

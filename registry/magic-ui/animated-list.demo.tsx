"use client";

import { AnimatedList, AnimatedListItem } from "@/registry/magic-ui/animated-list";

const notifications = [
  {
    icon: "💸",
    color: "#00C9A7",
    title: "Payment received",
    subtitle: "$250 from Alice Johnson",
    time: "just now",
  },
  {
    icon: "👤",
    color: "#FFB800",
    title: "New follower",
    subtitle: "Bob Carter started following you",
    time: "2m ago",
  },
  {
    icon: "💬",
    color: "#FF3D71",
    title: "New message",
    subtitle: "Carol: Hey, are you free later?",
    time: "5m ago",
  },
  {
    icon: "📦",
    color: "#1E86FF",
    title: "Order shipped",
    subtitle: "Your order #4821 is on its way",
    time: "20m ago",
  },
  {
    icon: "📅",
    color: "#A855F7",
    title: "Meeting reminder",
    subtitle: "Team sync starts in 15 minutes",
    time: "1h ago",
  },
];

function NotificationCard({
  icon,
  color,
  title,
  subtitle,
  time,
}: (typeof notifications)[number]) {
  return (
    <div className="relative mx-auto w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all duration-200 hover:scale-[102%] dark:bg-neutral-900 dark:border dark:border-neutral-700">
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className="flex flex-row items-center gap-1 text-sm font-semibold dark:text-white">
            <span>{title}</span>
            <span className="text-neutral-400">·</span>
            <span className="text-xs font-normal text-neutral-400">{time}</span>
          </div>
          <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Demo() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center overflow-hidden bg-background p-8">
      <AnimatedList delay={900} className="w-full max-w-[420px]">
        {notifications.map((n, i) => (
          <AnimatedListItem key={i}>
            <NotificationCard {...n} />
          </AnimatedListItem>
        ))}
      </AnimatedList>
    </div>
  );
}

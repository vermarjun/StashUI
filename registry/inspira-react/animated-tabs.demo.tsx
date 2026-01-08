"use client"

import { AnimatedTabs, type AnimatedTab } from "@/registry/inspira-react/animated-tabs"

const tabs: AnimatedTab[] = [
  {
    title: "Home",
    value: "home",
    content: (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
        <div className="text-center">
          <div className="text-4xl">🏠</div>
          <h3 className="mt-4 text-2xl font-bold">Home Tab</h3>
          <p className="mt-2 text-indigo-100">Welcome to the home panel</p>
        </div>
      </div>
    ),
  },
  {
    title: "About",
    value: "about",
    content: (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white">
        <div className="text-center">
          <div className="text-4xl">👋</div>
          <h3 className="mt-4 text-2xl font-bold">About Tab</h3>
          <p className="mt-2 text-emerald-100">Learn more about us here</p>
        </div>
      </div>
    ),
  },
  {
    title: "Work",
    value: "work",
    content: (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-rose-600 p-8 text-white">
        <div className="text-center">
          <div className="text-4xl">💼</div>
          <h3 className="mt-4 text-2xl font-bold">Work Tab</h3>
          <p className="mt-2 text-orange-100">See our portfolio and projects</p>
        </div>
      </div>
    ),
  },
]

export default function AnimatedTabsDemo() {
  return (
    <div className="min-h-[500px] w-full max-w-2xl p-8">
      <AnimatedTabs
        tabs={tabs}
        defaultValue="home"
        containerClassName="bg-gray-100 dark:bg-neutral-800 rounded-full p-1"
        activeTabClassName="bg-white dark:bg-neutral-600 shadow-sm"
        tabClassName="text-sm font-medium"
        contentClassName=""
      />
    </div>
  )
}

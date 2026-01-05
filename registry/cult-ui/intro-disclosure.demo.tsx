"use client"

import { useState } from "react"
import { IntroDisclosure } from "@/registry/cult-ui/intro-disclosure"

const steps = [
  {
    title: "Welcome to the App",
    short_description: "Let us show you around in just a few steps.",
    full_description: "This quick tour will walk you through the key features that help you get the most out of your experience.",
    media: {
      type: "image" as const,
      src: "https://picsum.photos/seed/intro1/800/450",
      alt: "Welcome screen",
    },
  },
  {
    title: "Explore the Dashboard",
    short_description: "Your central hub for all activity and insights.",
    full_description: "The dashboard gives you an at-a-glance view of your projects, recent activity, and key metrics all in one place.",
    media: {
      type: "image" as const,
      src: "https://picsum.photos/seed/intro2/800/450",
      alt: "Dashboard overview",
    },
  },
  {
    title: "Collaborate with Your Team",
    short_description: "Invite teammates and work together in real time.",
    full_description: "Share projects, assign tasks, and communicate with your team without ever leaving the app.",
    action: {
      label: "Invite Teammates",
      onClick: () => console.log("Invite clicked"),
    },
    media: {
      type: "image" as const,
      src: "https://picsum.photos/seed/intro3/800/450",
      alt: "Team collaboration",
    },
  },
]

export default function Demo() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-48 gap-4 p-8">
      {!open && (
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
          onClick={() => setOpen(true)}
        >
          Open Feature Tour
        </button>
      )}
      <IntroDisclosure
        steps={steps}
        featureId="demo-tour"
        open={open}
        setOpen={setOpen}
        onComplete={() => console.log("Tour complete")}
        onSkip={() => console.log("Tour skipped")}
      />
    </div>
  )
}

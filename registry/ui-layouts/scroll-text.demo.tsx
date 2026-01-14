"use client"

import TextAnimation from "@/registry/ui-layouts/scroll-text"

export default function Demo() {
  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 space-y-6">
      <TextAnimation
        text="Welcome to the future of design"
        as="h1"
        classname="text-4xl font-bold"
        direction="down"
      />
      <TextAnimation
        text="Build beautiful interfaces with animated text"
        as="p"
        classname="text-xl"
        direction="up"
        letterAnime
      />
      <TextAnimation
        text="Scroll to reveal stunning animations"
        as="h2"
        classname="text-2xl font-semibold"
        direction="left"
        lineAnime
      />
    </div>
  )
}

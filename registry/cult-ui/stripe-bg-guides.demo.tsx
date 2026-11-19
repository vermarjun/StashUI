"use client"

import { StripeBgGuides } from "@/registry/cult-ui/stripe-bg-guides"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black">
      <StripeBgGuides
        contained
        columnCount={6}
        animated
        direction="top-to-bottom"
        easing="linear"
        animationDuration={4}
        animationDelay={0.35}
        glowColor="#a5b4fc"
        glowOpacity={0.9}
        glowSize="22vh"
        randomize
        randomInterval={5000}
        maxActiveColumns={4}
        darkMode
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-400">
          Payments infrastructure for the internet
        </span>
        <h2 className="max-w-2xl text-5xl font-semibold tracking-tight text-white">
          Accept payments and scale faster
        </h2>
        <p className="max-w-md text-neutral-400">
          Column guides with light pulses travelling along them, the layout
          pattern behind Stripe&apos;s marketing pages.
        </p>
      </div>
    </div>
  )
}

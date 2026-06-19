"use client"

import {
  ExpandableScreen,
  ExpandableScreenTrigger,
  ExpandableScreenContent,
} from "@/registry/cult-ui/expandable-screen"

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[480px]">
      <ExpandableScreen animationDuration={0.35}>
        <ExpandableScreenTrigger>
          <div className="group flex flex-col items-start gap-3 w-72 rounded-2xl border border-border bg-card p-5 shadow-sm cursor-pointer transition-shadow hover:shadow-md">
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600"
              alt="Preview"
              className="w-full h-36 object-cover rounded-xl"
            />
            <div>
              <h3 className="font-semibold text-foreground text-base">
                Expand to Full Screen
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Click this card to open an immersive view
              </p>
            </div>
            <span className="text-xs font-medium text-primary">
              Tap to expand →
            </span>
          </div>
        </ExpandableScreenTrigger>

        <ExpandableScreenContent className="bg-neutral-900 flex flex-col">
          <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
            <img
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1200"
              alt="Full view"
              className="w-full max-w-2xl rounded-2xl object-cover max-h-64"
            />
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-3">Full Screen Experience</h2>
              <p className="text-neutral-300 max-w-md leading-relaxed">
                This panel morphed from the card. Press the × button or
                Escape to collapse back.
              </p>
            </div>
            <button
              className="mt-2 px-6 py-2.5 rounded-full bg-white text-neutral-900 font-medium text-sm hover:bg-neutral-100 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Get Started
            </button>
          </div>
        </ExpandableScreenContent>
      </ExpandableScreen>
    </div>
  )
}

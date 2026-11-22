"use client"

import React from "react"

import Screensaver from "./screensaver"

const images = [
  "photo-1506905925346-21bda4d32df4",
  "photo-1548192746-dd526f154ed9",
  "photo-1460999158988-6f0380f81f4d",
  "photo-1517849845537-4d257902454a",
  "photo-1618220649687-ba860f3176e7",
  "photo-1572851899646-a1f69c664e1e",
  "photo-1518599904199-0ca897819ddb",
  "photo-1584043204475-8cc101d6c77a",
]

export default function ScreensaverDemo() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Start the photos spread across the box, heading in different directions,
  // so the composition is balanced from the first frame.
  return (
    <div className="flex h-[600px] w-full items-center justify-center px-6">
      <div
        ref={containerRef}
        className="relative flex h-[560px] w-full max-w-5xl items-center justify-center overflow-hidden rounded-3xl border border-border bg-background text-foreground"
      >
        <h1 className="z-30 text-7xl font-medium tracking-tight">page not found</h1>
        {[...images, ...images].map((id, index) => (
          <Screensaver
            key={index}
            speed={1.6}
            startPosition={{ x: (index * 37) % 100, y: (index * 59 + 13) % 100 }}
            startAngle={25 + ((index * 83) % 360)}
            containerRef={containerRef}
          >
            <div className="h-36 w-36 overflow-hidden rounded-md shadow-lg">
              <img
                src={`https://images.unsplash.com/${id}?w=400&q=80`}
                alt={`Floating photo ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </Screensaver>
        ))}
      </div>
    </div>
  )
}

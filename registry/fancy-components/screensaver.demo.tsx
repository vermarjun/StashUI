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

  return (
    <div
      ref={containerRef}
      className="relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <h1 className="z-30 text-6xl font-medium tracking-tight">page not found</h1>
      {[...images, ...images].map((id, index) => (
        <Screensaver
          key={index}
          speed={1}
          startPosition={{ x: index * 6, y: index * 5 }}
          startAngle={40}
          containerRef={containerRef}
        >
          <div className="h-32 w-32 overflow-hidden">
            <img
              src={`https://images.unsplash.com/${id}?w=400&q=80`}
              alt={`Floating photo ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        </Screensaver>
      ))}
    </div>
  )
}

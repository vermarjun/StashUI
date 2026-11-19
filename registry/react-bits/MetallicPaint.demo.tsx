"use client"

import MetallicPaint from "@/registry/react-bits/MetallicPaint"

// A solid sparkle silhouette: MetallicPaint reads the shape's alpha, so it needs
// a logo-style mark on a transparent background, not a photo.
const sparkle = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><path fill="#000" d="M400 30 C440 290 510 360 770 400 C510 440 440 510 400 770 C360 510 290 440 30 400 C290 360 360 290 400 30 Z"/></svg>`
const logo = `data:image/svg+xml;utf8,${encodeURIComponent(sparkle)}`

export default function Demo() {
  return (
    <div className="flex h-[600px] w-full items-center justify-center bg-background">
      <div className="relative h-[440px] w-[440px]">
        <MetallicPaint
          imageSrc={logo}
          speed={0.3}
          scale={4}
          brightness={2}
          liquid={0.75}
          tintColor="#ffffff"
        />
      </div>
    </div>
  )
}

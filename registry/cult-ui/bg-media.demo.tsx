"use client"

import BackgroundMedia from "@/registry/cult-ui/bg-media"

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <BackgroundMedia
        type="image"
        src="https://picsum.photos/seed/bgmedia1/1600/900"
        alt="Background landscape"
        variant="light"
      />
    </div>
  )
}

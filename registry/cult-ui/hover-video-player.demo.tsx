"use client"

import { HoverVideoPlayer } from "@/registry/cult-ui/hover-video-player"

export default function Demo() {
  return (
    <div className="w-full max-w-md p-4">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <HoverVideoPlayer
          videoSrc="/media/sample-clip.mp4"
          thumbnailSrc="/media/sample-clip.jpg"
          className="w-full h-full rounded-xl"
          muted
          loop
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        Hover to play the video
      </p>
    </div>
  )
}

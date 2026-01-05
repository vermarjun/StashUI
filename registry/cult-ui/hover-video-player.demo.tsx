"use client"

import { HoverVideoPlayer } from "@/registry/cult-ui/hover-video-player"

export default function Demo() {
  return (
    <div className="w-full max-w-md p-4">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <HoverVideoPlayer
          videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
          thumbnailSrc="https://picsum.photos/seed/video1/800/450"
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

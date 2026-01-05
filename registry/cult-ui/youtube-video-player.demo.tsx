"use client"

import { YouTubePlayer } from "@/registry/cult-ui/youtube-video-player"

export default function Demo() {
  return (
    <div className="w-full max-w-xl p-4">
      <YouTubePlayer
        videoId="dQw4w9WgXcQ"
        title="Rick Astley - Never Gonna Give You Up"
      />
    </div>
  )
}

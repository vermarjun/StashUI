"use client"

import { YouTubePlayer } from "@/registry/cult-ui/youtube-video-player"

export default function Demo() {
  return (
    <div className="w-full max-w-2xl p-4">
      <YouTubePlayer
        videoId="aqz-KE-bpKQ"
        title="Big Buck Bunny · Blender Open Movie"
        customThumbnail="https://i.ytimg.com/vi/aqz-KE-bpKQ/maxresdefault.jpg"
      />
    </div>
  )
}

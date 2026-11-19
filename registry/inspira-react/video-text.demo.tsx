"use client";

import { VideoText } from "@/registry/inspira-react/video-text";

export default function VideoTextDemo() {
  return (
    <div className="relative h-[320px] w-full max-w-5xl overflow-hidden">
      <VideoText
        src="https://cdn.magicui.design/ocean-small.webm"
        fontSize={18}
        fontWeight="900"
        fontFamily="Arial Black, sans-serif"
      >
        OCEAN
      </VideoText>
    </div>
  );
}

"use client";
import { VideoText } from "@/registry/magic-ui/video-text";

export default function Demo() {
  return (
    <div className="relative h-[420px] w-full overflow-hidden">
      <VideoText src="https://cdn.magicui.design/ocean-small.webm">
        OCEAN
      </VideoText>
    </div>
  );
}

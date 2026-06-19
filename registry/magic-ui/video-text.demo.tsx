"use client";
import { VideoText } from "@/registry/magic-ui/video-text";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full h-64 bg-background">
      <VideoText
        src="https://cdn.pixabay.com/video/2020/07/21/45373-443525716_large.mp4"
        fontSize={18}
        fontWeight="bold"
        className="w-full h-full"
      >
        CINEMATIC
      </VideoText>
    </div>
  );
}

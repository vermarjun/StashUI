"use client";
import React from "react";
import { VideoText } from "@/registry/inspira-react/video-text";

export default function VideoTextDemo() {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="h-64 w-full max-w-4xl">
        <VideoText
          src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4"
          fontSize={15}
          fontWeight="900"
          fontFamily="Arial Black, sans-serif"
        >
          HELLO
        </VideoText>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import VideoAmbient from "./video-ambient";

export default function VideoAmbientDemo() {
  const [glow, setGlow] = useState(true);

  return (
    <div className="flex w-full flex-col items-center gap-8 px-16 py-14">
      <div className="w-full max-w-2xl">
        <VideoAmbient
          alt="Slow aerial footage with shifting colour"
          glow={glow}
          src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
        />
      </div>
      <button
        className="relative z-10 rounded-full border border-border bg-card px-4 py-1.5 text-foreground text-xs"
        onClick={() => setGlow((g) => !g)}
        type="button"
      >
        Ambient glow: {glow ? "On" : "Off"}
      </button>
    </div>
  );
}

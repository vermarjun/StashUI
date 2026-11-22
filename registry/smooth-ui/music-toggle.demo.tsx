"use client";

import { useEffect, useState } from "react";
import MusicToggle from "./music-toggle";

const TRACK_SECONDS = 214;

export default function MusicToggleDemo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.18);

  useEffect(() => {
    if (!playing) {
      return;
    }
    const id = setInterval(
      () => setProgress((p) => (p >= 1 ? 0 : p + 0.25 / TRACK_SECONDS)),
      250
    );
    return () => clearInterval(id);
  }, [playing]);

  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="rounded-3xl border border-border bg-card px-6 py-5">
        <MusicToggle
          artist="Nils Halvorsen"
          cover="https://images.unsplash.com/photo-1478028928718-7bfdb1b32095?w=400&q=80"
          onPlayingChange={setPlaying}
          onSeek={setProgress}
          playing={playing}
          progress={progress}
          size={96}
          title="Northern Lights, Slowly"
        />
      </div>
    </div>
  );
}

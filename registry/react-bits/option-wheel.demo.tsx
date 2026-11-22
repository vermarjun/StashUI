"use client";

import { useState } from "react";
import OptionWheel from "@/registry/react-bits/option-wheel";

const GENRES = ["Ambient", "House", "Techno", "Jazz", "Lo-Fi", "Synthwave", "Trance", "Funk", "Disco", "Hip-Hop", "Chillwave", "Drum & Bass"];

export default function Demo() {
  const [genre, setGenre] = useState(GENRES[4]);
  return (
    <div className="flex h-[560px] w-full items-stretch bg-background">
      <div className="relative w-1/2">
        <OptionWheel items={GENRES} defaultSelected={4} onChange={(_, item) => setGenre(item)} loop />
      </div>
      <div className="flex w-1/2 flex-col justify-center gap-3 pr-12">
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Now tuning</span>
        <span className="text-4xl font-semibold tracking-tight text-foreground">{genre}</span>
        <span className="text-sm text-muted-foreground">Scroll, drag or use the arrow keys to spin the wheel.</span>
      </div>
    </div>
  );
}

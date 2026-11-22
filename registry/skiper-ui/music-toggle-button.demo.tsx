"use client";

import { MusicToggleButton } from "./music-toggle-button";

export default function MusicToggleButtonDemo() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center gap-8 p-8 text-foreground">
      <div className="flex items-center gap-5 rounded-3xl border border-border bg-card px-6 py-5 shadow-2xl shadow-black/40">
        <img
          src="https://images.unsplash.com/photo-1761078980679-e89e25fe279b?w=300&q=80"
          alt="Album cover"
          className="h-20 w-20 rounded-xl object-cover"
        />
        <div className="mr-8">
          <p className="text-lg font-semibold">Night Drive</p>
          <p className="text-sm text-muted-foreground">Kaia Moreno · Lowlight</p>
          <div className="mt-3 h-1 w-40 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/5 rounded-full bg-foreground/70" />
          </div>
        </div>
        <div className="origin-center scale-[1.6]">
          <MusicToggleButton />
        </div>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Click to play</p>
    </div>
  );
}

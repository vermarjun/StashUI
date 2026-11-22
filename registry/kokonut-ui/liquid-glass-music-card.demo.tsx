"use client";
/* eslint-disable @next/next/no-img-element */

import NowPlaying from "@/registry/kokonut-ui/liquid-glass-music-card";

export default function LiquidGlassMusicCardDemo() {
  return (
    <div className="relative flex h-[460px] w-full items-center justify-center overflow-hidden">
      <img
        alt=""
        className="absolute inset-0 size-full object-cover opacity-80"
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative w-full max-w-sm px-4">
        <NowPlaying glassEffect />
      </div>
    </div>
  );
}

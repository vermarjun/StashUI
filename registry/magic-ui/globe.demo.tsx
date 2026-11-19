"use client"

import type { COBEOptions } from "cobe"
import { Globe } from "@/registry/magic-ui/globe"

const DARK_GLOBE: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [0.18, 0.18, 0.22],
  markerElevation: 0,
  markers: [
    { location: [14.5995, 120.9842], size: 0.012 },
    { location: [19.076, 72.8777], size: 0.04 },
    { location: [23.8103, 90.4125], size: 0.02 },
    { location: [30.0444, 31.2357], size: 0.028 },
    { location: [39.9042, 116.4074], size: 0.032 },
    { location: [-23.5505, -46.6333], size: 0.04 },
    { location: [19.4326, -99.1332], size: 0.04 },
    { location: [40.7128, -74.006], size: 0.04 },
    { location: [34.6937, 135.5022], size: 0.02 },
    { location: [41.0082, 28.9784], size: 0.024 },
  ],
}

export default function Demo() {
  return (
    <div className="relative mx-auto flex h-[600px] w-full max-w-3xl items-start justify-center overflow-hidden rounded-xl border border-border bg-background pt-12">
      <span className="pointer-events-none z-10 bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-center text-7xl font-semibold leading-none tracking-tight whitespace-pre-wrap text-transparent">
        Global edge
      </span>
      <Globe className="top-32" config={DARK_GLOBE} />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  )
}

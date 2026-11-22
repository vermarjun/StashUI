"use client";

import { useState } from "react";
import ExposureSlider from "./exposure-slider";

export default function ExposureSliderDemo() {
  const [ev, setEv] = useState(0);

  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-black">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            alt="Mountain ridge at dawn"
            className="h-full w-full object-cover transition-[filter] duration-150"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&q=80"
            style={{ filter: `brightness(${1 + ev * 0.035})` }}
          />
          <span className="absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 font-medium text-[11px] text-amber-300 tracking-wide backdrop-blur">
            EV {ev > 0 ? `+${(ev / 10).toFixed(1)}` : (ev / 10).toFixed(1)}
          </span>
        </div>
        <div className="px-4 pt-4 pb-5">
          <ExposureSlider accentColor="#fbbf24" onChange={setEv} />
        </div>
      </div>
    </div>
  );
}

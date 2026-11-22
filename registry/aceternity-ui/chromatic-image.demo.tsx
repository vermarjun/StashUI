"use client";

import { ChromaticImage } from "./chromatic-image";

export default function ChromaticImageDemo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center p-8">
      <ChromaticImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
        alt="Mountain range above the clouds at sunrise"
        className="h-[520px] w-full max-w-4xl rounded-3xl"
        backgroundColor="#0a0a0a"
        displacement={0.08}
        chromaticShift={0.02}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              Issue 07 · Altitude
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Above the weather
            </h2>
          </div>
          <span className="text-sm text-white/70">Move to distort</span>
        </div>
      </ChromaticImage>
    </div>
  );
}

"use client";

import RippleDistortion from "./ripple-distortion";

export default function RippleDistortionDemo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <RippleDistortion src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" trigger="both" />
      <div className="pointer-events-none absolute inset-x-0 bottom-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Move to disturb the water</p>
      </div>
    </div>
  );
}

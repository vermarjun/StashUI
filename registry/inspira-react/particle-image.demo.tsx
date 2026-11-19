"use client";

import { ParticleImage } from "@/registry/inspira-react/particle-image";

// A transparent logo: particles are spawned from every non-transparent pixel
// and keep the pixel's colour, so a crisp gradient mark reads best.
const LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="300" viewBox="0 0 640 300">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="0.5" stop-color="#a78bfa"/>
      <stop offset="1" stop-color="#f472b6"/>
    </linearGradient>
  </defs>
  <path fill="url(#g)" d="M150 40 L70 165 H140 L118 260 L220 120 H150 L180 40 Z"/>
  <text x="255" y="190" fill="url(#g)" font-family="Helvetica, Arial, sans-serif" font-size="128" font-weight="800" letter-spacing="-4">Spark</text>
</svg>`)}`;

export default function ParticleImageDemo() {
  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-center gap-6 p-8">
      <ParticleImage
        imageSrc={LOGO}
        canvasWidth="760"
        canvasHeight="360"
        particleGap="3"
        particleSize="3"
        gravity="0.08"
        mouseForce="40"
        initPosition="random"
        initDirection="random"
        renderer="default"
      />
      <p className="text-muted-foreground text-sm">Sweep the cursor through the logo to scatter it</p>
    </div>
  );
}

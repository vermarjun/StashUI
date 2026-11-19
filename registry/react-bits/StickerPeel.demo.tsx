"use client";

import StickerPeel from "@/registry/react-bits/StickerPeel";

// A die-cut sticker: white border, transparent outside, so the peel reads as
// paper lifting off rather than a photo being cropped.
const art = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
<circle cx="300" cy="300" r="290" fill="#ffffff"/>
<circle cx="300" cy="300" r="262" fill="#111111"/>
<circle cx="300" cy="300" r="236" fill="none" stroke="#ffffff" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>
<path fill="#ffffff" d="M300 112 C314 196 336 218 420 232 C336 246 314 268 300 352 C286 268 264 246 180 232 C264 218 286 196 300 112 Z"/>
<text x="300" y="440" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="68" font-weight="800" letter-spacing="4" fill="#ffffff">SHIP IT</text>
<text x="300" y="486" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="8" fill="#9a9a9a">FRIDAY CLUB</text>
</svg>`;
const sticker = `data:image/svg+xml;utf8,${encodeURIComponent(art)}`;

export default function Demo() {
  return (
    <div className="relative flex h-[580px] w-full items-center justify-center overflow-hidden">
      <p className="pointer-events-none absolute bottom-8 select-none text-sm text-muted-foreground">
        Hover to peel it back, drag to move it
      </p>
      <StickerPeel
        imageSrc={sticker}
        width={300}
        rotate={0}
        peelBackHoverPct={28}
        peelBackActivePct={48}
        shadowIntensity={0.6}
        lightingIntensity={0.1}
        initialPosition="center"
      />
    </div>
  );
}

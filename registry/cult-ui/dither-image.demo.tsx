"use client";

import { useState } from "react";

import {
  DitherImage,
  DitherImageCaption,
  DitherImageContent,
  DitherImageFrame,
  DitherImageOverlay,
  DitherImageReveal,
} from "@/registry/cult-ui/dither-image";

const MOUNTAINS =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop&auto=format&q=80";
const PUG =
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&h=800&fit=crop&auto=format&q=80";

export default function Demo() {
  // the clean photo follows the cursor: everything left of it is clean, right is dithered
  const [split, setSplit] = useState(45);

  return (
    <div className="flex min-h-[520px] w-full flex-wrap items-start justify-center gap-12 p-10">
      <DitherImage className="w-80">
        <DitherImageFrame size="md" aspectRatio="square">
          <DitherImageContent src={PUG} alt="Pug on a yellow wall, dithered" fill sizes="320px" />
        </DitherImageFrame>
        <DitherImageCaption>Fully dithered, 16px Bayer cell</DitherImageCaption>
      </DitherImage>

      <DitherImage className="w-80">
        <DitherImageReveal
          className="w-80 cursor-ew-resize rounded-xl"
          style={{ aspectRatio: "1 / 1" }}
          data-reveal
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setSplit(Math.round(((e.clientX - r.left) / r.width) * 100));
          }}
          onPointerLeave={() => setSplit(45)}
        >
          <DitherImageFrame size="sm" aspectRatio="square" brightness={0.7} className="w-full">
            <DitherImageContent src={MOUNTAINS} alt="Mountains above the clouds" fill sizes="320px" />
          </DitherImageFrame>
          <DitherImageOverlay
            src={MOUNTAINS}
            alt=""
            fill
            sizes="320px"
            direction="r"
            from={Math.max(0, split - 8)}
            to={Math.min(100, split + 8)}
          />
        </DitherImageReveal>
        <DitherImageCaption>Partial reveal: move across to wipe the clean photo</DitherImageCaption>
      </DitherImage>
    </div>
  );
}

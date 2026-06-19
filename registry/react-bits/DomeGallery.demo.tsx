"use client";

import DomeGallery from "@/registry/react-bits/DomeGallery";

const IMAGES = Array.from({ length: 12 }, (_, i) => ({
  src: `https://picsum.photos/seed/dome-${i + 1}/500/500`,
  alt: `Gallery image ${i + 1}`,
}));

export default function Demo() {
  return (
    <div className="h-[600px] w-full">
      <DomeGallery images={IMAGES} />
    </div>
  );
}

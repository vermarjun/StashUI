"use client";

import { ImagesBadge } from "@/registry/inspira-react/images-badge";

const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=80&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=80&fit=crop",
  "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=100&h=80&fit=crop",
];

export default function ImagesBadgeDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 p-8">
      <ImagesBadge
        text="3 photos"
        images={SAMPLE_IMAGES}
      />
      <ImagesBadge
        text="View gallery"
        images={SAMPLE_IMAGES.slice(0, 2)}
        href="#"
        target="_blank"
      />
      <ImagesBadge
        text="Large thumbnails"
        images={SAMPLE_IMAGES}
        hoverImageSize={{ width: 64, height: 48 }}
        hoverTranslateY={-50}
        hoverSpread={28}
      />
    </div>
  );
}

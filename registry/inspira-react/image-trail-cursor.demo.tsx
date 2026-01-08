"use client";

import { ImageTrailCursor } from "@/registry/inspira-react/image-trail-cursor";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=220&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=220&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=220&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=220&fit=crop",
  "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=200&h=220&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=200&h=220&fit=crop",
];

export default function ImageTrailCursorDemo() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl bg-neutral-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="pointer-events-none select-none text-center text-2xl font-bold text-white/20">
          Move your cursor here
        </p>
      </div>
      <ImageTrailCursor images={DEMO_IMAGES} variant="type1" />
    </div>
  );
}

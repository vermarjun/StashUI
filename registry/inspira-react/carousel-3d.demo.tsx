"use client";

import { Carousel3D } from "@/registry/inspira-react/carousel-3d";

// A set of placeholder landscape images from picsum.photos
const IMAGES = [
  "https://picsum.photos/seed/a1/450/600",
  "https://picsum.photos/seed/b2/450/600",
  "https://picsum.photos/seed/c3/450/600",
  "https://picsum.photos/seed/d4/450/600",
  "https://picsum.photos/seed/e5/450/600",
  "https://picsum.photos/seed/f6/450/600",
];

export default function Carousel3DDemo() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <h2 className="mb-4 text-2xl font-bold">Drag to rotate</h2>
      <Carousel3D items={IMAGES} width={300} height={400} />
    </div>
  );
}

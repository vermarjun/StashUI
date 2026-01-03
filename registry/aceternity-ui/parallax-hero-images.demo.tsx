"use client";
import { ParallaxHeroImages } from "@/registry/aceternity-ui/parallax-hero-images";

const images = [
  "https://picsum.photos/seed/ph1/400/300",
  "https://picsum.photos/seed/ph2/400/300",
  "https://picsum.photos/seed/ph3/400/300",
  "https://picsum.photos/seed/ph4/400/300",
  "https://picsum.photos/seed/ph5/400/300",
  "https://picsum.photos/seed/ph6/400/300",
  "https://picsum.photos/seed/ph7/400/300",
  "https://picsum.photos/seed/ph8/400/300",
];

export default function Demo() {
  return (
    <div className="relative w-full h-[600px] bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Parallax Hero</h1>
          <p className="text-gray-400 mt-2">Move your mouse to see the effect</p>
        </div>
      </div>
      <ParallaxHeroImages images={images} />
    </div>
  );
}

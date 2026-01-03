"use client";
import { ParallaxScrollSecond } from "@/registry/aceternity-ui/parallax-scroll-2";

const images = [
  "https://picsum.photos/seed/ps1/400/400",
  "https://picsum.photos/seed/ps2/400/400",
  "https://picsum.photos/seed/ps3/400/400",
  "https://picsum.photos/seed/ps4/400/400",
  "https://picsum.photos/seed/ps5/400/400",
  "https://picsum.photos/seed/ps6/400/400",
  "https://picsum.photos/seed/ps7/400/400",
  "https://picsum.photos/seed/ps8/400/400",
  "https://picsum.photos/seed/ps9/400/400",
];

export default function Demo() {
  return (
    <div className="w-full max-w-5xl">
      <ParallaxScrollSecond images={images} />
    </div>
  );
}

"use client";
import { ParallaxScroll } from "@/registry/aceternity-ui/parallax-scroll";

const images = [
  "https://picsum.photos/seed/p1/400/400",
  "https://picsum.photos/seed/p2/400/400",
  "https://picsum.photos/seed/p3/400/400",
  "https://picsum.photos/seed/p4/400/400",
  "https://picsum.photos/seed/p5/400/400",
  "https://picsum.photos/seed/p6/400/400",
  "https://picsum.photos/seed/p7/400/400",
  "https://picsum.photos/seed/p8/400/400",
  "https://picsum.photos/seed/p9/400/400",
];

export default function Demo() {
  return (
    <div className="w-full max-w-5xl">
      <ParallaxScroll images={images} />
    </div>
  );
}

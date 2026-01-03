"use client";
import { ThreeDMarquee } from "@/registry/aceternity-ui/3d-marquee";

const images = [
  "https://picsum.photos/seed/a1/970/700",
  "https://picsum.photos/seed/a2/970/700",
  "https://picsum.photos/seed/a3/970/700",
  "https://picsum.photos/seed/a4/970/700",
  "https://picsum.photos/seed/a5/970/700",
  "https://picsum.photos/seed/a6/970/700",
  "https://picsum.photos/seed/a7/970/700",
  "https://picsum.photos/seed/a8/970/700",
  "https://picsum.photos/seed/a9/970/700",
  "https://picsum.photos/seed/a10/970/700",
  "https://picsum.photos/seed/a11/970/700",
  "https://picsum.photos/seed/a12/970/700",
];

export default function Demo() {
  return (
    <div className="w-full max-w-4xl">
      <ThreeDMarquee images={images} />
    </div>
  );
}

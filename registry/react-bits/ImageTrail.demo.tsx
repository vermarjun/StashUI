"use client";

import ImageTrail from "@/registry/react-bits/ImageTrail";

const ITEMS = [
  "https://picsum.photos/seed/trail1/400/440",
  "https://picsum.photos/seed/trail2/400/440",
  "https://picsum.photos/seed/trail3/400/440",
  "https://picsum.photos/seed/trail4/400/440",
  "https://picsum.photos/seed/trail5/400/440",
  "https://picsum.photos/seed/trail6/400/440",
  "https://picsum.photos/seed/trail7/400/440",
  "https://picsum.photos/seed/trail8/400/440",
];

export default function Demo() {
  return (
    <div className="relative w-full h-full min-h-[480px]">
      <ImageTrail items={ITEMS} variant={1} />
    </div>
  );
}

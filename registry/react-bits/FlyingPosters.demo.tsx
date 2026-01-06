"use client";
import FlyingPosters from "@/registry/react-bits/FlyingPosters";

const posterImages = [
  "https://picsum.photos/seed/poster1/320/320",
  "https://picsum.photos/seed/poster2/320/320",
  "https://picsum.photos/seed/poster3/320/320",
  "https://picsum.photos/seed/poster4/320/320",
  "https://picsum.photos/seed/poster5/320/320",
  "https://picsum.photos/seed/poster6/320/320",
];

export default function Demo() {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: "480px" }}>
      <FlyingPosters
        items={posterImages}
        planeWidth={280}
        planeHeight={280}
        distortion={3}
        scrollEase={0.01}
      />
    </div>
  );
}

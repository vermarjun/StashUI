"use client";
import React from "react";
import { BendingGallery } from "@/registry/inspira-react/bending-gallery";

const items = [
  { image: "https://picsum.photos/seed/1/800/600?grayscale", text: "Bridge" },
  { image: "https://picsum.photos/seed/2/800/600?grayscale", text: "Desk Setup" },
  { image: "https://picsum.photos/seed/3/800/600?grayscale", text: "Waterfall" },
  { image: "https://picsum.photos/seed/4/800/600?grayscale", text: "Strawberries" },
  { image: "https://picsum.photos/seed/5/800/600?grayscale", text: "Deep Diving" },
  { image: "https://picsum.photos/seed/16/800/600?grayscale", text: "Train Track" },
];

export default function BendingGalleryDemo() {
  return (
    <div className="h-96 w-full bg-neutral-950">
      <BendingGallery
        items={items}
        bend={3}
        textColor="#ffffff"
        borderRadius={0.05}
        font="bold 28px sans-serif"
      />
    </div>
  );
}

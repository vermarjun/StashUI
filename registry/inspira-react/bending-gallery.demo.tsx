"use client";
import React from "react";
import { BendingGallery } from "@/registry/inspira-react/bending-gallery";

const items = [
  { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=560&h=700&fit=crop&auto=format&q=75", text: "Alpine Sunrise" },
  { image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=560&h=700&fit=crop&auto=format&q=75", text: "Rice Terraces" },
  { image: "https://images.unsplash.com/photo-1460999158988-6f0380f81f4d?w=560&h=700&fit=crop&auto=format&q=75", text: "Icelandic Horses" },
  { image: "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?w=560&h=700&fit=crop&auto=format&q=75", text: "Autumn Canopy" },
  { image: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=560&h=700&fit=crop&auto=format&q=75", text: "Blue Lotus" },
  { image: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=560&h=700&fit=crop&auto=format&q=75", text: "Coral Rose" },
  { image: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=560&h=700&fit=crop&auto=format&q=75", text: "Single Leaf" },
];

export default function BendingGalleryDemo() {
  return (
    <div className="h-[560px] w-full bg-neutral-950">
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

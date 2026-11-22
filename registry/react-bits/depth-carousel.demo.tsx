"use client";

import DepthCarousel from "@/registry/react-bits/depth-carousel";

const PHOTOS = [
  { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", alt: "Peaks above the clouds" },
  { image: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=800&q=80", alt: "Mountain lake" },
  { image: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=800&q=80", alt: "Coastline" },
  { image: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800&q=80", alt: "Forest road" },
  { image: "https://images.unsplash.com/photo-1460999158988-6f0380f81f4d?w=800&q=80", alt: "Desert dunes" },
  { image: "https://images.unsplash.com/photo-1478028928718-7bfdb1b32095?w=800&q=80", alt: "Night sky" },
];

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <DepthCarousel items={PHOTOS} cardWidth={300} cardHeight={400} />
    </div>
  );
}

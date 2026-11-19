"use client";

import { PhotoGallery } from "@/registry/inspira-react/photo-gallery";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1756806983725-977bb2308d4e?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1665470909901-162912ec16f7?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1452626212852-811d58933cae?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1683223585116-23e136669e80?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&h=400&fit=crop&auto=format&q=80" },
  { src: "https://images.unsplash.com/photo-1718603630685-d2605d5190e8?w=400&h=400&fit=crop&auto=format&q=80" },
];

export default function PhotoGalleryDemo() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <PhotoGallery items={IMAGES} size={90} />
    </div>
  );
}

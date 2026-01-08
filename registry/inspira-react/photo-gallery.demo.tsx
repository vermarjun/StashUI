"use client";

import { PhotoGallery } from "@/registry/inspira-react/photo-gallery";

const IMAGES = [
  { src: "https://picsum.photos/seed/pg1/400/400" },
  { src: "https://picsum.photos/seed/pg2/400/400" },
  { src: "https://picsum.photos/seed/pg3/400/400" },
  { src: "https://picsum.photos/seed/pg4/400/400" },
  { src: "https://picsum.photos/seed/pg5/400/400" },
  { src: "https://picsum.photos/seed/pg6/400/400" },
  { src: "https://picsum.photos/seed/pg7/400/400" },
  { src: "https://picsum.photos/seed/pg8/400/400" },
  { src: "https://picsum.photos/seed/pg9/400/400" },
  { src: "https://picsum.photos/seed/pg10/400/400" },
];

export default function PhotoGalleryDemo() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <PhotoGallery items={IMAGES} size={90} />
    </div>
  );
}

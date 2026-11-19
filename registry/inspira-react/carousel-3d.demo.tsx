"use client";

import { Carousel3D } from "@/registry/inspira-react/carousel-3d";

// A set of landscape photos (Unsplash)
const IMAGES = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=450&h=600&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=450&h=600&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=450&h=600&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?w=450&h=600&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=450&h=600&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=450&h=600&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1494806812796-244fe51b774d?w=450&h=600&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1518710843675-2540dd79065c?w=450&h=600&fit=crop&auto=format&q=80",
];

export default function Carousel3DDemo() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <h2 className="mb-4 text-2xl font-bold tracking-tight">Drag to rotate</h2>
      <Carousel3D items={IMAGES} width={300} height={400} />
    </div>
  );
}

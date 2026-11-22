"use client";

import { Carousel_006 } from "./clip-path-carousel";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80", alt: "Mountain ridge", title: "Silent Peaks" },
  { src: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?w=900&q=80", alt: "Landscape", title: "Golden Dusk" },
  { src: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?w=900&q=80", alt: "Landscape", title: "Azure Ridge" },
  { src: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=900&q=80", alt: "Landscape", title: "Emerald Woods" },
  { src: "https://images.unsplash.com/photo-1761882725885-d3d8bd2032d1?w=900&q=80", alt: "Landscape", title: "Falling Mist" },
  { src: "https://images.unsplash.com/photo-1761775915848-467e41c1c4db?w=900&q=80", alt: "Landscape", title: "Midnight Veil" },
  { src: "https://images.unsplash.com/photo-1760389005000-bf02bf24f463?w=900&q=80", alt: "Landscape", title: "Cloud Summit" },
  { src: "https://images.unsplash.com/photo-1761882835101-02ab45ac0726?w=900&q=80", alt: "Landscape", title: "Forest Fungi" },
];

export default function ClipPathCarouselDemo() {
  return (
    <div className="flex min-h-[620px] w-full items-center justify-center overflow-hidden bg-background py-10">
      <Carousel_006 images={IMAGES} loop showNavigation showPagination />
    </div>
  );
}

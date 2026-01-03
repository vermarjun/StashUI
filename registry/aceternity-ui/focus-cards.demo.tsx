"use client";

import { FocusCards } from "@/registry/aceternity-ui/focus-cards";

export default function Demo() {
  const cards = [
    {
      title: "Forest in the mountains",
      src: "https://picsum.photos/seed/forest/800/600",
    },
    {
      title: "City lights at night",
      src: "https://picsum.photos/seed/city/800/600",
    },
    {
      title: "Ocean waves at sunset",
      src: "https://picsum.photos/seed/ocean/800/600",
    },
    {
      title: "Desert dunes",
      src: "https://picsum.photos/seed/desert/800/600",
    },
    {
      title: "Snowy mountain peak",
      src: "https://picsum.photos/seed/mountain/800/600",
    },
    {
      title: "Tropical rainforest",
      src: "https://picsum.photos/seed/rainforest/800/600",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      <FocusCards cards={cards} />
    </div>
  );
}

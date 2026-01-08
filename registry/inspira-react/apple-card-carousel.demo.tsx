"use client";
import React from "react";
import {
  AppleCardCarousel,
  AppleCard,
  type CardData,
} from "@/registry/inspira-react/apple-card-carousel";

const cards: CardData[] = [
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    title: "Mountain Peaks",
    category: "Nature",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        Breathtaking mountain peaks covered in snow, offering serene views and
        peaceful solitude.
      </p>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    title: "Ocean Waves",
    category: "Seascape",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        The rhythmic crash of ocean waves against golden shores, a timeless
        dance of nature.
      </p>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    title: "Forest Path",
    category: "Forest",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        A winding path through ancient trees, dappled sunlight filtering through
        the canopy.
      </p>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    title: "Desert Dunes",
    category: "Desert",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        Rolling sand dunes stretching endlessly under a blazing sun, a portrait
        of solitude.
      </p>
    ),
  },
  {
    src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800",
    title: "City Lights",
    category: "Urban",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        Glittering city lights at night, a tapestry of human achievement and
        vibrant life.
      </p>
    ),
  },
];

export default function AppleCardCarouselDemo() {
  const cardElements = cards.map((card, index) => (
    <AppleCard key={card.title} card={card} index={index} layout />
  ));

  return (
    <div className="w-full bg-neutral-100 dark:bg-neutral-900 py-8">
      <h2 className="pl-4 md:pl-8 text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
        Explore the World
      </h2>
      <p className="pl-4 md:pl-8 text-sm text-neutral-500 dark:text-neutral-400 mb-4">
        Click any card to learn more.
      </p>
      <AppleCardCarousel items={cardElements} />
    </div>
  );
}

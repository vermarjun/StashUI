"use client";
import {
  Carousel,
  Card,
} from "@/registry/aceternity-ui/apple-cards-carousel";

const cards = [
  {
    category: "Nature",
    title: "Mountains at Dawn",
    src: "https://images.unsplash.com/photo-1718524767487-7f98d4e5eeeb?w=1200&h=800&fit=crop&auto=format&q=80",
    content: (
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Towering peaks bathed in golden morning light: a scene of quiet
        grandeur that reminds us how vast the world truly is.
      </p>
    ),
  },
  {
    category: "Architecture",
    title: "City of Glass",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=800&fit=crop&auto=format&q=80",
    content: (
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Steel and glass reaching for the sky, reflecting clouds and ambition in
        equal measure.
      </p>
    ),
  },
  {
    category: "Ocean",
    title: "Deep Blue Horizon",
    src: "https://images.unsplash.com/photo-1695239510467-f1e93d649c2b?w=1200&h=800&fit=crop&auto=format&q=80",
    content: (
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Where the sea meets the sky, endless possibility stretches before you.
      </p>
    ),
  },
  {
    category: "Forest",
    title: "Into the Woods",
    src: "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?w=1200&h=800&fit=crop&auto=format&q=80",
    content: (
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Ancient trees form a cathedral of green, hushing the noise of the
        modern world.
      </p>
    ),
  },
  {
    category: "Desert",
    title: "Golden Dunes",
    src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&h=800&fit=crop&auto=format&q=80",
    content: (
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Waves of sand sculpted by wind into perfect curves of amber and ochre.
      </p>
    ),
  },
];

export default function Demo() {
  const items = cards.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout />
  ));

  return (
    <div className="w-full">
      <Carousel items={items} />
    </div>
  );
}

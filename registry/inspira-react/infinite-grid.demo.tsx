"use client";

import { InfiniteGrid } from "@/registry/inspira-react/infinite-grid";
import type { CardData } from "@/registry/inspira-react/infinite-grid";

const CARD_DATA: CardData[] = [
  {
    title: "Mountain Sunrise",
    badge: "Nature",
    description: "A stunning view of the mountains at dawn.",
    tags: ["landscape", "sunrise", "nature"],
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  },
  {
    title: "Urban Architecture",
    badge: "City",
    description: "Modern skyscrapers piercing the sky.",
    tags: ["city", "architecture", "modern"],
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop",
  },
  {
    title: "Ocean Waves",
    badge: "Sea",
    description: "Powerful waves crashing on the shore.",
    tags: ["ocean", "waves", "beach"],
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&h=300&fit=crop",
  },
  {
    title: "Forest Path",
    badge: "Nature",
    description: "A serene path through an ancient forest.",
    tags: ["forest", "nature", "trees"],
    date: "2024-04-05",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop",
  },
  {
    title: "Desert Dunes",
    badge: "Desert",
    description: "The endless beauty of sand dunes.",
    tags: ["desert", "sand", "arid"],
    date: "2024-05-18",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop",
  },
  {
    title: "Snowy Peaks",
    badge: "Winter",
    description: "Snow-capped mountains in winter.",
    tags: ["snow", "mountains", "winter"],
    date: "2024-06-22",
    image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=400&h=300&fit=crop",
  },
  {
    title: "Tropical Beach",
    badge: "Beach",
    description: "Crystal clear waters and white sand.",
    tags: ["beach", "tropical", "sea"],
    date: "2024-07-01",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
  },
  {
    title: "Autumn Leaves",
    badge: "Season",
    description: "Colors of fall in the park.",
    tags: ["autumn", "leaves", "fall"],
    date: "2024-08-14",
    image: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=400&h=300&fit=crop",
  },
  {
    title: "Night Sky",
    badge: "Astro",
    description: "Milky Way stretching across the dark sky.",
    tags: ["stars", "milky-way", "night"],
    date: "2024-09-30",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop",
  },
  {
    title: "Waterfall",
    badge: "Water",
    description: "A cascading waterfall in the jungle.",
    tags: ["waterfall", "jungle", "water"],
    date: "2024-10-07",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&h=300&fit=crop",
  },
  {
    title: "City Lights",
    badge: "Urban",
    description: "A city alive with glowing lights at night.",
    tags: ["city", "night", "lights"],
    date: "2024-11-11",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
  },
  {
    title: "Rolling Hills",
    badge: "Rural",
    description: "Green rolling hills under a blue sky.",
    tags: ["hills", "green", "countryside"],
    date: "2024-12-25",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=300&fit=crop",
  },
];

export default function InfiniteGridDemo() {
  return (
    <div className="h-[600px] w-full overflow-hidden rounded-xl">
      <InfiniteGrid
        cardData={CARD_DATA}
        options={{
          gridCols: 4,
          gridRows: 3,
          enablePostProcessing: true,
          postProcessParams: {
            distortionIntensity: -0.15,
          },
        }}
        onTilesLoaded={() => console.log("Tiles loaded!")}
        onTileClicked={(detail) => console.log("Tile clicked:", detail)}
      />
    </div>
  );
}

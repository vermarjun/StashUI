"use client";
import { DirectionAwareHover } from "@/registry/aceternity-ui/direction-aware-hover";

const cards = [
  {
    imageUrl: "https://picsum.photos/seed/dah1/400/400",
    label: "Mountains",
    sub: "Landscape",
  },
  {
    imageUrl: "https://picsum.photos/seed/dah2/400/400",
    label: "Forest",
    sub: "Nature",
  },
  {
    imageUrl: "https://picsum.photos/seed/dah3/400/400",
    label: "Ocean",
    sub: "Seascape",
  },
];

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-center py-10">
      {cards.map((card) => (
        <DirectionAwareHover key={card.label} imageUrl={card.imageUrl}>
          <div>
            <p className="font-semibold text-lg leading-tight">{card.label}</p>
            <p className="text-sm text-white/70">{card.sub}</p>
          </div>
        </DirectionAwareHover>
      ))}
    </div>
  );
}

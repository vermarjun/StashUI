"use client";
import { DirectionAwareHover } from "@/registry/aceternity-ui/direction-aware-hover";

const cards = [
  {
    imageUrl: "https://images.unsplash.com/photo-1759269834694-3daf291dce44?w=400&h=400&fit=crop&auto=format&q=80",
    label: "Mountains",
    sub: "Landscape",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=400&h=400&fit=crop&auto=format&q=80",
    label: "Forest",
    sub: "Nature",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1590867286251-8e26d9f255c0?w=400&h=400&fit=crop&auto=format&q=80",
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

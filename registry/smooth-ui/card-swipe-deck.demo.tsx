"use client";

import { Heart, RotateCcw, X } from "lucide-react";
import { useRef } from "react";
import CardSwipeDeck, {
  type CardSwipeDeckHandle,
  type CardSwipeDeckItem,
} from "./card-swipe-deck";

const PLACES = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    meta: "4 nights · from $1,240",
    name: "Dolomites, Italy",
  },
  {
    image: "https://images.unsplash.com/photo-1478028928718-7bfdb1b32095?w=800&q=80",
    meta: "6 nights · from $1,890",
    name: "Lofoten, Norway",
  },
  {
    image: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800&q=80",
    meta: "8 nights · from $2,310",
    name: "Patagonia, Chile",
  },
  {
    image: "https://images.unsplash.com/photo-1460999158988-6f0380f81f4d?w=800&q=80",
    meta: "3 nights · from $980",
    name: "Lisbon, Portugal",
  },
  {
    image: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=800&q=80",
    meta: "5 nights · from $1,450",
    name: "Kyoto, Japan",
  },
];

const ITEMS: CardSwipeDeckItem[] = PLACES.map((place) => ({
  content: (
    <div className="relative h-full w-full">
      <img
        alt={place.name}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        src={place.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute right-5 bottom-5 left-5 text-white">
        <p className="font-semibold text-2xl">{place.name}</p>
        <p className="mt-1 text-sm text-white/75">{place.meta}</p>
      </div>
    </div>
  ),
  id: place.name,
}));

export default function CardSwipeDeckDemo() {
  const deck = useRef<CardSwipeDeckHandle>(null);

  return (
    <div className="flex w-full flex-col items-center gap-6 p-8">
      <CardSwipeDeck
        className="h-[420px] w-[300px]"
        items={ITEMS}
        labels={{ left: "Skip", right: "Save" }}
        onEmpty={() => setTimeout(() => deck.current?.reset(), 900)}
        ref={deck}
      />
      <div className="flex items-center gap-4">
        <button
          aria-label="Skip"
          className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-rose-400"
          onClick={() => deck.current?.swipeLeft()}
          type="button"
        >
          <X className="size-5" />
        </button>
        <button
          aria-label="Reset deck"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground"
          onClick={() => deck.current?.reset()}
          type="button"
        >
          <RotateCcw className="size-4" />
        </button>
        <button
          aria-label="Save"
          className="flex size-12 items-center justify-center rounded-full border border-border bg-card text-emerald-400"
          onClick={() => deck.current?.swipeRight()}
          type="button"
        >
          <Heart className="size-5" />
        </button>
      </div>
    </div>
  );
}

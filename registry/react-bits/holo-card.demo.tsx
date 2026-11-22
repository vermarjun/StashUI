"use client";

import HoloCard from "./holo-card";

export default function HoloCardDemo() {
  return (
    <div className="flex min-h-[560px] w-full items-center justify-center p-8">
      <HoloCard image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80" alt="Rare collectible card" width={300} />
    </div>
  );
}

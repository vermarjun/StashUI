"use client";

import { FocusCards } from "@/registry/aceternity-ui/focus-cards";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=1000&fit=crop&auto=format&q=80`;

export default function Demo() {
  const cards = [
    { title: "Above the clouds", src: img("1506905925346-21bda4d32df4") },
    { title: "Alpine valley", src: img("1693581176773-a5f2362209e6") },
    { title: "Misty lake at dawn", src: img("1759434192768-fe3facebd5f6") },
    { title: "Quiver tree, Namibia", src: img("1718954572423-2780fe600028") },
    { title: "Limestone coast", src: img("1573790387438-4da905039392") },
    { title: "Forest lake", src: img("1759395073808-17782f3d8d66") },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <FocusCards cards={cards} />
    </div>
  );
}

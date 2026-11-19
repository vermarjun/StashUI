"use client";

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/registry/aceternity-ui/draggable-card";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=640&h=640&fit=crop&auto=format&q=80`;

const items = [
  {
    title: "Iceland",
    image: img("1506905925346-21bda4d32df4"),
    className: "absolute top-6 left-[8%] rotate-[-5deg]",
  },
  {
    title: "Namibia",
    image: img("1718954572423-2780fe600028"),
    className: "absolute top-24 left-[28%] rotate-[-7deg]",
  },
  {
    title: "Norway",
    image: img("1759434192768-fe3facebd5f6"),
    className: "absolute top-4 left-[44%] rotate-[8deg]",
  },
  {
    title: "Greece",
    image: img("1573790387438-4da905039392"),
    className: "absolute top-28 left-[58%] rotate-[10deg]",
  },
  {
    title: "Switzerland",
    image: img("1693581176773-a5f2362209e6"),
    className: "absolute top-10 right-[6%] rotate-[2deg]",
  },
  {
    title: "Canada",
    image: img("1759395073808-17782f3d8d66"),
    className: "absolute top-36 left-[18%] rotate-[4deg]",
  },
];

export default function Demo() {
  return (
    <DraggableCardContainer className="relative flex min-h-[640px] w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        If it&apos;s your first day at Fight Club, you have to fight.
      </p>
      {items.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-64 w-64 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}

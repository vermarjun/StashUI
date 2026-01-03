"use client";

import Carousel from "@/registry/aceternity-ui/carousel";

export default function Demo() {
  const slides = [
    {
      title: "Discover the Mountains",
      button: "Explore Now",
      src: "https://picsum.photos/seed/mountains/800/800",
    },
    {
      title: "Ocean Adventures",
      button: "Dive In",
      src: "https://picsum.photos/seed/ocean2/800/800",
    },
    {
      title: "Urban Explorations",
      button: "Visit City",
      src: "https://picsum.photos/seed/urban/800/800",
    },
    {
      title: "Forest Retreats",
      button: "Find Peace",
      src: "https://picsum.photos/seed/forest2/800/800",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center py-10">
      <Carousel slides={slides} />
    </div>
  );
}

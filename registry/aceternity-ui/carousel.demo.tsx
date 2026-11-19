"use client";

import Carousel from "@/registry/aceternity-ui/carousel";

export default function Demo() {
  const slides = [
    {
      title: "Discover the Mountains",
      button: "Explore Now",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?w=1000&h=1000&fit=crop&auto=format&q=80",
    },
    {
      title: "Ocean Adventures",
      button: "Dive In",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?w=1000&h=1000&fit=crop&auto=format&q=80",
    },
    {
      title: "Urban Explorations",
      button: "Visit City",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?w=1000&h=1000&fit=crop&auto=format&q=80",
    },
    {
      title: "Forest Retreats",
      button: "Find Peace",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?w=1000&h=1000&fit=crop&auto=format&q=80",
    },
  ];

  return (
    <div className="w-full flex items-center justify-center py-10 pb-20">
      <Carousel slides={slides} />
    </div>
  );
}

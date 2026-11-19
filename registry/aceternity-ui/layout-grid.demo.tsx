"use client";

import { LayoutGrid } from "@/registry/aceternity-ui/layout-grid";

export default function Demo() {
  const cards = [
    {
      id: 1,
      content: (
        <div>
          <p className="font-bold text-white text-xl">Tokyo, Japan</p>
          <p className="text-white text-sm mt-2">
            Neon lights, cherry blossoms, and ancient temples.
          </p>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=500&fit=crop&auto=format&q=80",
    },
    {
      id: 2,
      content: (
        <div>
          <p className="font-bold text-white text-xl">Santorini, Greece</p>
          <p className="text-white text-sm mt-2">
            Whitewashed villages overlooking the azure Aegean Sea.
          </p>
        </div>
      ),
      className: "col-span-1",
      thumbnail: "https://images.unsplash.com/photo-1754405300142-246a9bf917d9?w=500&h=500&fit=crop&auto=format&q=80",
    },
    {
      id: 3,
      content: (
        <div>
          <p className="font-bold text-white text-xl">Machu Picchu, Peru</p>
          <p className="text-white text-sm mt-2">
            Ancient Incan city perched high in the Andes Mountains.
          </p>
        </div>
      ),
      className: "col-span-1",
      thumbnail: "https://images.unsplash.com/photo-1719554873571-0fd6bf322bb1?w=500&h=500&fit=crop&auto=format&q=80",
    },
    {
      id: 4,
      content: (
        <div>
          <p className="font-bold text-white text-xl">Patagonia, Argentina</p>
          <p className="text-white text-sm mt-2">
            Wild landscapes of glaciers, mountains, and fjords.
          </p>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&h=500&fit=crop&auto=format&q=80",
    },
  ];

  return (
    <div className="w-full h-[600px]">
      <LayoutGrid cards={cards} />
    </div>
  );
}

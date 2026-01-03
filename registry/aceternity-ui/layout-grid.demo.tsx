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
      thumbnail: "https://picsum.photos/seed/tokyo/800/500",
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
      thumbnail: "https://picsum.photos/seed/santorini/500/500",
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
      thumbnail: "https://picsum.photos/seed/machu/500/500",
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
      thumbnail: "https://picsum.photos/seed/patagonia/800/500",
    },
  ];

  return (
    <div className="w-full h-[600px]">
      <LayoutGrid cards={cards} />
    </div>
  );
}

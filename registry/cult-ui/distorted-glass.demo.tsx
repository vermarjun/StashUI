"use client";

import { DistortedGlass } from "@/registry/cult-ui/distorted-glass";

const shots = [
  { id: "1506905925346-21bda4d32df4", title: "Above the clouds", place: "Zermatt, Switzerland" },
  { id: "1469474968028-56623f02e42e", title: "Golden hour ridge", place: "Dolomites, Italy" },
  { id: "1476180814856-a36609db0493", title: "Facade study", place: "Lisbon, Portugal" },
  { id: "1475727946784-2890c8fdb9c8", title: "Fire in the sky", place: "Over the Atlantic" },
];

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <div className="relative h-[560px] w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card">
        <div data-scroll className="h-full overflow-y-auto [scrollbar-width:none]">
          <div className="flex flex-col gap-4 p-4 pb-28">
            {shots.map((s) => (
              <figure key={s.id} className="relative overflow-hidden rounded-xl">
                <img
                  src={`https://images.unsplash.com/photo-${s.id}?w=1100&h=560&fit=crop&auto=format&q=80`}
                  alt={s.title}
                  className="h-[280px] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="font-medium text-white">{s.title}</p>
                  <p className="text-sm text-white/70">{s.place}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        {/* the ribbed glass strip sits pinned over the bottom edge of the feed */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <DistortedGlass className="block h-[90px] w-full lg:w-full xl:w-full" />
        </div>
      </div>
    </div>
  );
}

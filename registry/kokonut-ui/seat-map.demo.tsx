"use client";

import SeatMap from "@/registry/kokonut-ui/seat-map";

export default function SeatMapDemo() {
  return (
    <div className="flex w-full justify-center p-4">
      <SeatMap
        defaultSelected={["F3", "F4"]}
        subtitle="Tonight · 20:15 · Screen 2"
        title="The Last Lighthouse"
      />
    </div>
  );
}

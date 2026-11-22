"use client";

import InfiniteSpiral from "@/registry/react-bits/infinite-spiral";

const IDS = [
  "1506905925346-21bda4d32df4",
  "1548192746-dd526f154ed9",
  "1518599904199-0ca897819ddb",
  "1504198266287-1659872e6590",
  "1460999158988-6f0380f81f4d",
  "1478028928718-7bfdb1b32095",
  "1508873881324-c92a3fc536ba",
  "1540553016722-983e48a2cd10",
  "1525310072745-f49212b5ac6d",
  "1572851899646-a1f69c664e1e",
  "1618220649687-ba860f3176e7",
  "1584043204475-8cc101d6c77a",
];

const ITEMS = IDS.map(id => `https://images.unsplash.com/photo-${id}?w=400&q=80`);

export default function Demo() {
  return (
    <div className="relative h-[620px] w-full overflow-hidden bg-background">
      <InfiniteSpiral items={ITEMS} cardWidth={120} cardHeight={150} radius={260} />
    </div>
  );
}

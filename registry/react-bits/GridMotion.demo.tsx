"use client";

import GridMotion from "@/registry/react-bits/GridMotion";

const PHOTOS = [
  "photo-1512045519129-eb9ceb788555",
  "photo-1516705486637-7b01bf9b9d13",
  "photo-1517322048670-4fba75cbbb62",
  "photo-1517849845537-4d257902454a",
  "photo-1518020382113-a7e8fc38eac9",
  "photo-1518599904199-0ca897819ddb",
  "photo-1518972734183-c5b490a7c637",
  "photo-1519389950473-47ba0277781c",
  "photo-1519681393784-d120267933ba",
  "photo-1520256862855-398228c41684",
  "photo-1521737711867-e3b97375f902",
  "photo-1522071820081-009f0129c71c",
  "photo-1523275335684-37898b6baf30",
  "photo-1523612192437-66de9804ac3c",
  "photo-1525310072745-f49212b5ac6d",
  "photo-1529626455594-4ff0802cfb7e",
  "photo-1531482615713-2afd69097998",
  "photo-1532423622396-10a3f979251a",
  "photo-1534259070436-a95806b8621a",
  "photo-1534528741775-53994a69daeb",
  "photo-1535713875002-d1d0cf377fde",
  "photo-1535968881874-0c39f1503640",
  "photo-1540553016722-983e48a2cd10",
  "photo-1543508282-6319a3e2621f",
  "photo-1544077960-604201fe74bc",
  "photo-1544168190-79c17527004f",
  "photo-1546484475-7f7bd55792da",
  "photo-1546942113-a6c43b63104a",
];
const photo = (i: number, w: number, h: number) =>
  `https://images.unsplash.com/${PHOTOS[Math.abs(i) % PHOTOS.length]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const img = (seed: string) =>
  photo([...seed].reduce((h, c) => h * 31 + c.charCodeAt(0), 7), 600, 400);

const labels = ["Motion", "Grid", "Depth", "Flow", "Drift", "Parallax", "Tilt"];

// Mix of images and text tiles, like the React Bits demo.
const items = Array.from({ length: 28 }, (_, i) =>
  i % 4 === 1 ? (
    <span key={i} className="text-lg font-semibold tracking-tight">
      {labels[i % labels.length]}
    </span>
  ) : (
    img(`grid-${i}`)
  ),
);

export default function Demo() {
  return (
    <div className="h-[640px] w-full overflow-hidden bg-background">
      <GridMotion items={items} gradientColor="rgba(120,120,140,0.35)" />
    </div>
  );
}

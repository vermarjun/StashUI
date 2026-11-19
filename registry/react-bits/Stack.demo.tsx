"use client";

import Stack from "@/registry/react-bits/Stack";

const PHOTOS = [
  "photo-1611162617213-7d7a39e9b1d7",
  "photo-1611582450053-0f056a82a68e",
  "photo-1615451210353-cbcf249f392a",
  "photo-1618005182384-a83a8bd57fbe",
  "photo-1618220649687-ba860f3176e7",
  "photo-1623366302587-b38b1ddaefd9",
  "photo-1628965882741-570e75becd5d",
  "photo-1642849206045-d34279481967",
  "photo-1643037508102-46fb319979c5",
  "photo-1661980494567-40a5e01b699b",
  "photo-1665470909901-162912ec16f7",
  "photo-1667776384514-a06f0b7675a1",
];
const photo = (i: number, w: number, h: number) =>
  `https://images.unsplash.com/${PHOTOS[Math.abs(i) % PHOTOS.length]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const IMAGES = ["coast", "forest", "dunes", "alps"].map((seed) => (
  <img
    alt={seed}
    className="pointer-events-none h-full w-full object-cover"
    draggable={false}
    key={seed}
    src={photo([...String(seed)].reduce((h, c) => h * 31 + c.charCodeAt(0), 7), 500, 500)}
  />
));

export default function Demo() {
  return (
    <div className="flex min-h-[520px] w-full flex-col items-center justify-center gap-10 p-8">
      <div className="h-64 w-64">
        <Stack cards={IMAGES} sendToBackOnClick sensitivity={180} />
      </div>
      <p className="text-muted-foreground text-sm">Drag the top card away or click it to send it to the back.</p>
    </div>
  );
}

"use client";

import Masonry from "@/registry/react-bits/Masonry";

const PHOTOS = [
  "photo-1551434678-e076c223a692",
  "photo-1552058544-f2b08422138a",
  "photo-1552664730-d307ca884978",
  "photo-1553729459-efe14ef6055d",
  "photo-1554931670-4ebfabf6e7a9",
  "photo-1555212697-194d092e3b8f",
  "photo-1555400038-63f5ba517a47",
  "photo-1555803741-1ac759ac2f53",
  "photo-1556648011-e01aca870a81",
  "photo-1557683316-973673baf926",
  "photo-1557804506-669a67965ba0",
  "photo-1558618666-fcd25c85cd64",
  "photo-1560250097-0b93528c311a",
  "photo-1560520653-9e0e4c89eb11",
  "photo-1565759732117-a48f0bedbbfd",
  "photo-1569292316763-0b667e9e960c",
  "photo-1572025442646-866d16c84a54",
  "photo-1572120360610-d971b9d7767c",
  "photo-1572851899646-a1f69c664e1e",
  "photo-1573165850883-9b0e18c44bd2",
];
const photo = (i: number, w: number, h: number) =>
  `https://images.unsplash.com/${PHOTOS[Math.abs(i) % PHOTOS.length]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const heights = [600, 400, 500, 350, 480, 420, 560, 380, 450, 620, 400, 520];

const items = heights.map((height, i) => ({
  id: String(i + 1),
  img: photo(i, 600, Math.round(height * 1.5)),
  url: "https://unsplash.com",
  height,
}));

export default function Demo() {
  return (
    <div className="h-[680px] w-full max-w-5xl overflow-hidden p-2">
      <Masonry
        items={items}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.95}
        blurToFocus
      />
    </div>
  );
}

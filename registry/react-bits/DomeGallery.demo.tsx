"use client";

import DomeGallery from "@/registry/react-bits/DomeGallery";

const PHOTOS = [
  "photo-1573496358322-6d530124361d",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1573790387438-4da905039392",
  "photo-1575995864268-5dec34a5bb99",
  "photo-1580411788548-eee17fc98883",
  "photo-1583071299210-c6c113f4ac91",
  "photo-1584043204475-8cc101d6c77a",
  "photo-1590867286251-8e26d9f255c0",
  "photo-1590872000386-4348c6393115",
  "photo-1595407660626-db35dcd16609",
  "photo-1597200381847-30ec200eeb9a",
  "photo-1599054799131-4b09c73a63cf",
];
const photo = (i: number, w: number, h: number) =>
  `https://images.unsplash.com/${PHOTOS[Math.abs(i) % PHOTOS.length]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const IMAGES = Array.from({ length: 12 }, (_, i) => ({
  src: photo(i, 500, 500),
  alt: `Gallery image ${i + 1}`,
}));

export default function Demo() {
  return (
    <div className="h-[600px] w-full">
      <DomeGallery images={IMAGES} />
    </div>
  );
}

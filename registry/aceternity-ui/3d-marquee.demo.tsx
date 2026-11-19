"use client";

import { ThreeDMarquee } from "@/registry/aceternity-ui/3d-marquee";

const PHOTOS = [
  "photo-1419242902214-272b3f66ee7a",
  "photo-1426604966848-d7adac402bff",
  "photo-1433838552652-f9a46b332c40",
  "photo-1438761681033-6461ffad8d80",
  "photo-1441974231531-c6227db76b6e",
  "photo-1441986300917-64674bd600d8",
  "photo-1447752875215-b2761acb3c5d",
  "photo-1448375240586-882707db888b",
  "photo-1449844908441-8829872d2607",
  "photo-1452626212852-811d58933cae",
  "photo-1460999158988-6f0380f81f4d",
  "photo-1461749280684-dccba630e2f6",
  "photo-1461988320302-91bde64fc8e4",
  "photo-1462989856370-729a9c1e2c91",
  "photo-1464822759023-fed622ff2c3b",
  "photo-1465146344425-f00d5f5c8f07",
  "photo-1469474968028-56623f02e42e",
  "photo-1470071459604-3b5ec3a7fe05",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1472214103451-9374bd1c798e",
  "photo-1475727946784-2890c8fdb9c8",
  "photo-1475924156734-496f6cac6ec1",
  "photo-1476180814856-a36609db0493",
  "photo-1476514525535-07fb3b4ae5f1",
  "photo-1476842634003-7dcca8f832de",
  "photo-1477414348463-c0eb7f1359b6",
  "photo-1477959858617-67f85cf4f1df",
  "photo-1478028928718-7bfdb1b32095",
  "photo-1480074568708-e7b720bb3f09",
  "photo-1482049016688-2d3e1b311543",
  "photo-1486325212027-8081e485255e",
  "photo-1486406146926-c627a92ad1ab",
];
const photo = (i: number, w: number, h: number) =>
  `https://images.unsplash.com/${PHOTOS[i % PHOTOS.length]}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const images = Array.from(
  { length: 32 },
  (_, i) => photo(i, 485, 350),
);

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-7xl rounded-3xl bg-muted/40 p-2 ring-1 ring-border">
      <ThreeDMarquee images={images} />
    </div>
  );
}

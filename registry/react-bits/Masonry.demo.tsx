"use client";
import Masonry from "@/registry/react-bits/Masonry";

const items = [
  {
    id: "1",
    img: "https://picsum.photos/seed/masonry1/400/600",
    url: "https://picsum.photos",
    height: 600,
  },
  {
    id: "2",
    img: "https://picsum.photos/seed/masonry2/400/400",
    url: "https://picsum.photos",
    height: 400,
  },
  {
    id: "3",
    img: "https://picsum.photos/seed/masonry3/400/500",
    url: "https://picsum.photos",
    height: 500,
  },
  {
    id: "4",
    img: "https://picsum.photos/seed/masonry4/400/350",
    url: "https://picsum.photos",
    height: 350,
  },
  {
    id: "5",
    img: "https://picsum.photos/seed/masonry5/400/480",
    url: "https://picsum.photos",
    height: 480,
  },
  {
    id: "6",
    img: "https://picsum.photos/seed/masonry6/400/420",
    url: "https://picsum.photos",
    height: 420,
  },
];

export default function Demo() {
  return (
    <div className="w-full" style={{ height: "500px" }}>
      <Masonry items={items} animateFrom="bottom" scaleOnHover />
    </div>
  );
}

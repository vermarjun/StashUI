"use client";
import { ParallaxScroll } from "@/registry/aceternity-ui/parallax-scroll";

const images = [
  "https://images.unsplash.com/photo-1605106901227-991bd663255c?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1583071299210-c6c113f4ac91?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1754968230523-052635c98f99?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1688909906484-738d78601884?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1717588604557-55b2888f59a6?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1667776384514-a06f0b7675a1?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1679640034489-a6db1f096b70?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop&auto=format&q=80",
];

export default function Demo() {
  return (
    <div className="w-full max-w-5xl">
      <ParallaxScroll images={images} />
    </div>
  );
}

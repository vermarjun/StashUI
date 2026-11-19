"use client";
import { ParallaxScrollSecond } from "@/registry/aceternity-ui/parallax-scroll-2";

const images = [
  "https://images.unsplash.com/photo-1605106702842-01a887a31122?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1532423622396-10a3f979251a?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1718633739487-6efee8ac466d?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1476180814856-a36609db0493?w=400&h=400&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1496861083958-175bb1bd5702?w=400&h=400&fit=crop&auto=format&q=80",
];

export default function Demo() {
  return (
    <div className="w-full max-w-5xl">
      <ParallaxScrollSecond images={images} />
    </div>
  );
}

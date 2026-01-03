"use client";
import { InfiniteMovingCards } from "@/registry/aceternity-ui/infinite-moving-cards";

const testimonials = [
  {
    quote: "This component library is absolutely stunning. The animations are smooth and the design is top-notch.",
    name: "Alice Johnson",
    title: "Senior Frontend Engineer",
  },
  {
    quote: "I've never seen such beautiful UI components. They integrate seamlessly into any project.",
    name: "Bob Martinez",
    title: "Product Designer",
  },
  {
    quote: "The infinite scroll effect is mesmerizing. Our users love it and engagement has increased significantly.",
    name: "Carol Chen",
    title: "Head of Product",
  },
  {
    quote: "Building with these components saves us hours every week. The quality is simply unmatched.",
    name: "David Kim",
    title: "Full Stack Developer",
  },
  {
    quote: "Our design system transformed overnight thanks to these incredible ready-to-use components.",
    name: "Emma Wilson",
    title: "CTO at Acme Corp",
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-5xl flex flex-col items-center justify-center py-10">
      <InfiniteMovingCards items={testimonials} direction="left" speed="slow" />
    </div>
  );
}

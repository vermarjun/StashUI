"use client";
import { CardStack } from "@/registry/aceternity-ui/card-stack";

const CARDS = [
  {
    id: 0,
    name: "Alice Johnson",
    designation: "Senior Engineer at Vercel",
    content: (
      <p>
        These cards are absolutely gorgeous. The stacking animation is so smooth
        and the design is clean. I use them in all my projects now.
      </p>
    ),
  },
  {
    id: 1,
    name: "Bob Martinez",
    designation: "Product Designer at Figma",
    content: (
      <p>
        The attention to detail is incredible. Every pixel is perfectly placed
        and the interactions feel natural and delightful.
      </p>
    ),
  },
  {
    id: 2,
    name: "Carol Chen",
    designation: "CTO at Startup",
    content: (
      <p>
        We integrated these components into our design system and the team loves
        them. They save us so much time and always look professional.
      </p>
    ),
  },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <CardStack items={CARDS} />
    </div>
  );
}

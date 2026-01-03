"use client";
import { AnimatedTooltip } from "@/registry/aceternity-ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Alice Johnson",
    designation: "Software Engineer",
    image: "https://picsum.photos/seed/alice/100/100",
  },
  {
    id: 2,
    name: "Bob Martinez",
    designation: "Product Manager",
    image: "https://picsum.photos/seed/bob/100/100",
  },
  {
    id: 3,
    name: "Carol Chen",
    designation: "UX Designer",
    image: "https://picsum.photos/seed/carol/100/100",
  },
  {
    id: 4,
    name: "David Kim",
    designation: "DevOps Engineer",
    image: "https://picsum.photos/seed/david/100/100",
  },
  {
    id: 5,
    name: "Emma Wilson",
    designation: "Data Scientist",
    image: "https://picsum.photos/seed/emma/100/100",
  },
];

export default function Demo() {
  return (
    <div className="flex flex-row items-center justify-center w-full py-10">
      <AnimatedTooltip items={people} />
    </div>
  );
}

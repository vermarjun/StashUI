"use client";
import { AnimatedTooltip } from "@/registry/aceternity-ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Alice Johnson",
    designation: "Software Engineer",
    image: "https://images.unsplash.com/photo-1761882835101-02ab45ac0726?w=100&h=100&fit=crop&auto=format&q=80",
  },
  {
    id: 2,
    name: "Bob Martinez",
    designation: "Product Manager",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=100&h=100&fit=crop&auto=format&q=80",
  },
  {
    id: 3,
    name: "Carol Chen",
    designation: "UX Designer",
    image: "https://images.unsplash.com/photo-1611582450053-0f056a82a68e?w=100&h=100&fit=crop&auto=format&q=80",
  },
  {
    id: 4,
    name: "David Kim",
    designation: "DevOps Engineer",
    image: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=100&h=100&fit=crop&auto=format&q=80",
  },
  {
    id: 5,
    name: "Emma Wilson",
    designation: "Data Scientist",
    image: "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=100&h=100&fit=crop&auto=format&q=80",
  },
];

export default function Demo() {
  return (
    <div className="flex flex-row items-center justify-center w-full py-10">
      <AnimatedTooltip items={people} />
    </div>
  );
}

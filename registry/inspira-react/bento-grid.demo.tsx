"use client";
import React from "react";
import {
  BentoGrid,
  BentoGridCard,
  BentoGridItem,
} from "@/registry/inspira-react/bento-grid";

const StarIcon = () => (
  <svg
    className="size-8 text-neutral-700 dark:text-neutral-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const items = [
  {
    title: "Fast Performance",
    description:
      "Lightning-fast load times and buttery-smooth interactions that keep users engaged.",
    header: (
      <div className="flex h-full min-h-24 w-full items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700" />
    ),
    icon: <StarIcon />,
    className: "md:col-span-2",
  },
  {
    title: "Design System",
    description:
      "A cohesive set of components that share the same language.",
    header: (
      <div className="flex h-full min-h-24 w-full items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600" />
    ),
    icon: <StarIcon />,
    className: "md:col-span-1",
  },
  {
    title: "Dark Mode",
    description:
      "First-class dark mode support that respects user preferences.",
    header: (
      <div className="flex h-full min-h-24 w-full items-center justify-center rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-900" />
    ),
    icon: <StarIcon />,
    className: "md:col-span-1",
  },
  {
    title: "Accessible by Default",
    description:
      "Built with ARIA roles and keyboard navigation so everyone can use your UI.",
    header: (
      <div className="flex h-full min-h-24 w-full items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600" />
    ),
    icon: <StarIcon />,
    className: "md:col-span-2",
  },
];

export default function BentoGridDemo() {
  return (
    <div className="p-8">
      <BentoGrid className="max-w-4xl">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

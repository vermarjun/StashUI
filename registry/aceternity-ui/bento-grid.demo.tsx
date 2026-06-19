"use client";

import { BentoGrid, BentoGridItem } from "@/registry/aceternity-ui/bento-grid";

const items = [
  {
    title: "Ship at the speed of thought",
    description:
      "Stop wrestling with boilerplate and focus on what actually matters.",
    header: (
      <div className="flex h-full min-h-[6rem] w-full rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
    ),
    className: "md:col-span-2",
  },
  {
    title: "Type-safe by default",
    description: "Full TypeScript inference from props to styles.",
    header: (
      <div className="flex h-full min-h-[6rem] w-full rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
    ),
    className: "md:col-span-1",
  },
  {
    title: "Composable primitives",
    description: "Mix and match cells to build any dashboard layout.",
    header: (
      <div className="flex h-full min-h-[6rem] w-full rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
    ),
    className: "md:col-span-1",
  },
  {
    title: "Dark mode included",
    description: "Tokens adapt automatically — no extra selectors needed.",
    header: (
      <div className="flex h-full min-h-[6rem] w-full rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
    ),
    className: "md:col-span-2",
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <BentoGrid>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

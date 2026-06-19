"use client";

import Cmp, { ScrollStackItem } from "@/registry/react-bits/ScrollStack";

const cards = [
  { label: "01", title: "Design", bg: "bg-neutral-900", text: "Craft with intention" },
  { label: "02", title: "Build",  bg: "bg-neutral-800", text: "Ship with confidence" },
  { label: "03", title: "Launch", bg: "bg-neutral-700", text: "Reach your audience" },
  { label: "04", title: "Grow",   bg: "bg-neutral-600", text: "Scale without limits" },
];

export default function Demo() {
  return (
    <div className="w-full h-[560px]">
      <Cmp>
        {cards.map((card) => (
          <ScrollStackItem
            key={card.label}
            itemClassName={`${card.bg} flex flex-col justify-between`}
          >
            <span className="text-xs font-mono text-white/40">{card.label}</span>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{card.title}</h3>
              <p className="text-white/60 text-sm">{card.text}</p>
            </div>
          </ScrollStackItem>
        ))}
      </Cmp>
    </div>
  );
}

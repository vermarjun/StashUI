"use client";
import { CanvasRevealEffect } from "@/registry/aceternity-ui/canvas-reveal-effect";
import { useState } from "react";

const CARDS = [
  {
    label: "Cyan",
    colors: [[0, 255, 255]] as number[][],
    bg: "bg-black",
    animationSpeed: 5,
  },
  {
    label: "Magenta",
    colors: [[255, 0, 128]] as number[][],
    bg: "bg-zinc-900",
    animationSpeed: 5,
  },
  {
    label: "Amber",
    colors: [[255, 200, 0]] as number[][],
    bg: "bg-neutral-900",
    animationSpeed: 5,
  },
];

export default function Demo() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full items-center justify-center gap-4 p-8 bg-background">
      {CARDS.map((card, i) => (
        <div
          key={card.label}
          className={`relative h-64 w-56 cursor-pointer rounded-xl overflow-hidden border border-border ${card.bg}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === i && (
            <CanvasRevealEffect
              animationSpeed={card.animationSpeed}
              colors={card.colors}
              containerClassName="absolute inset-0"
              showGradient={true}
            />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <span className="text-2xl font-bold text-white">{card.label}</span>
            <span className="mt-2 text-xs text-white/50">hover me</span>
          </div>
        </div>
      ))}
    </div>
  );
}

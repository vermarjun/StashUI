"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface StarFieldProps {
  starsCount?: number;
  className?: string;
}

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  twinkleDuration: number;
  driftDuration: number;
  driftDirection: number;
  opacityStart: number;
  opacityEnd: number;
}

function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomSize(): number {
  return Math.random() < 0.5 ? 1 : 2;
}

export function StarField({ starsCount = 130, className }: StarFieldProps) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: starsCount }, (_, i) => ({
        id: i,
        top: `${random(0, 100)}%`,
        left: `${random(0, 100)}%`,
        size: randomSize(),
        twinkleDuration: random(2, 4),
        driftDuration: random(5, 10),
        driftDirection: random(-50, 50),
        opacityStart: random(0.1, 0.3),
        opacityEnd: random(0.7, 1),
      })),
    [starsCount],
  );

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <style>{`
        @keyframes sf-twinkle {
          0% { opacity: var(--sf-opacity-start); }
          100% { opacity: var(--sf-opacity-end); }
        }
        @keyframes sf-drift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(var(--sf-drift), calc(var(--sf-drift) / 2)); }
          50%  { transform: translate(calc(var(--sf-drift) / 2), var(--sf-drift)); }
          75%  { transform: translate(calc(var(--sf-drift) * -1), calc(var(--sf-drift) / 2)); }
          100% { transform: translate(0, 0); }
        }
        .sf-star {
          opacity: var(--sf-opacity-start);
          animation:
            sf-twinkle var(--sf-twinkle-dur) ease-in-out infinite alternate,
            sf-drift var(--sf-drift-dur) linear infinite;
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="sf-star absolute rounded-full bg-white"
          style={
            {
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--sf-twinkle-dur": `${star.twinkleDuration}s`,
              "--sf-drift-dur": `${star.driftDuration}s`,
              "--sf-drift": `${star.driftDirection}px`,
              "--sf-opacity-start": star.opacityStart,
              "--sf-opacity-end": star.opacityEnd,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

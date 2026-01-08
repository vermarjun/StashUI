"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const ORBIT_DIRECTION = {
  Clockwise: "normal",
  CounterClockwise: "reverse",
} as const;

export type OrbitDirection = (typeof ORBIT_DIRECTION)[keyof typeof ORBIT_DIRECTION];

interface OrbitProps {
  className?: string;
  direction?: OrbitDirection;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  children?: ReactNode;
}

export function Orbit({
  className,
  direction = ORBIT_DIRECTION.Clockwise,
  duration = 20,
  delay = 10,
  radius = 50,
  path = false,
  children,
}: OrbitProps) {
  const negativeDelay = -delay;

  const keyframes = `
    @keyframes orbit-${radius} {
      0% {
        transform: rotate(0deg) translateY(${radius}px) rotate(0deg);
      }
      100% {
        transform: rotate(360deg) translateY(${radius}px) rotate(-360deg);
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>

      {path && (
        <svg className="pointer-events-none absolute inset-0 size-full">
          <circle
            className="stroke-foreground/20 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      <div
        className={cn("absolute flex size-full transform-gpu", className)}
        style={{
          animation: `orbit-${radius} ${duration}s linear infinite`,
          animationDelay: `${negativeDelay}s`,
          animationDirection: direction,
        }}
      >
        {children}
      </div>
    </>
  );
}

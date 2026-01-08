"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlipCardProps {
  rotate?: "x" | "y";
  className?: string;
  /** Front face content */
  children?: ReactNode;
  /** Back face content */
  back?: ReactNode;
}

// ─── Rotation classes ─────────────────────────────────────────────────────────
const rotationClasses = {
  x: {
    hover: "group-hover:[transform:rotateX(180deg)]",
    back: "[transform:rotateX(180deg)]",
  },
  y: {
    hover: "group-hover:[transform:rotateY(180deg)]",
    back: "[transform:rotateY(180deg)]",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export function FlipCard({
  rotate = "y",
  className,
  children,
  back,
}: FlipCardProps) {
  const { hover, back: backRotation } = rotationClasses[rotate];

  return (
    <div
      className={cn(
        "group h-72 w-56 [perspective:1000px]",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]",
          hover
        )}
      >
        {/* Front */}
        <div className="absolute size-full overflow-hidden rounded-2xl border [backface-visibility:hidden]">
          {children}
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute h-full w-full overflow-hidden rounded-2xl border bg-black/80 p-4 text-slate-200 [backface-visibility:hidden]",
            backRotation
          )}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

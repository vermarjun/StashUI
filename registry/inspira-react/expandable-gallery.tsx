"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExpandableGalleryProps {
  images: string[];
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ExpandableGallery({ images, className }: ExpandableGalleryProps) {
  return (
    <div className={cn("flex h-96 w-full gap-2", className)}>
      {images.map((image) => (
        <div
          key={image}
          className="relative flex h-full flex-1 cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-in-out hover:flex-[3]"
        >
          <img
            className="relative h-full w-full object-cover"
            src={image}
            alt={image}
          />
        </div>
      ))}
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// The gallery uses CSS :has() selector tricks for the hover dim effect,
// and clip-path polygon animation on hover. These are injected as a global
// <style> block because CSS :has() with pseudo-classes isn't expressible
// in Tailwind utility classes alone.

const GALLERY_STYLES = `
.pg-gallery {
  --pg-size: 100px;
  grid-auto-rows: var(--pg-size);
  margin-bottom: var(--pg-size);
}

.pg-gallery:has(.pg-img:hover) .pg-img:not(:hover),
.pg-gallery:has(.pg-img:focus) .pg-img:not(:focus) {
  filter: brightness(0.5) contrast(0.5);
}

.pg-img {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  grid-column: auto / span 2;
  transition: clip-path 75ms, filter 75ms;
}

.pg-img:nth-child(5n-1) {
  grid-column: 2 / span 2;
}

.pg-img:hover,
.pg-img:focus {
  clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 0);
  z-index: 1;
  transition: clip-path 0.25s, filter 0.25s;
  filter: saturate(150%);
}

.pg-img:focus {
  outline: 10px dashed black;
  outline-offset: -5px;
}
`;

export interface PhotoGalleryItem {
  src: string;
}

export interface PhotoGalleryProps {
  items: PhotoGalleryItem[];
  containerClass?: string;
  imageClass?: string;
  /** Cell size in px (default 100) */
  size?: number;
}

export const PhotoGallery = React.forwardRef<
  HTMLDivElement,
  PhotoGalleryProps & React.HTMLAttributes<HTMLDivElement>
>(({ items, containerClass, imageClass, size = 100, className, ...props }, ref) => {
  return (
    <>
      <style>{GALLERY_STYLES}</style>
      <div
        ref={ref}
        className={cn("pg-gallery grid grid-cols-6 gap-1", containerClass, className)}
        style={{ "--pg-size": `${size}px` } as React.CSSProperties}
        {...props}
      >
        {items.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`image-${index}`}
            // size * 2 for the diamond shape height/width
            style={{ width: `${size * 2}px`, height: `${size * 2}px` }}
            className={cn(
              "pg-img rounded object-cover",
              imageClass,
            )}
          />
        ))}
      </div>
    </>
  );
});
PhotoGallery.displayName = "PhotoGallery";

"use client";

import { variantMap } from "@/registry/inspira-react/image-trail-variants";
import { useEffect, useRef } from "react";

export type VariantType = "type1" | "type2" | "type3" | "type4" | "type5" | "type6" | "type7";

interface ImageTrailCursorProps {
  images?: string[];
  variant?: VariantType;
}

export function ImageTrailCursor({
  images = [],
  variant = "type1",
}: ImageTrailCursorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (instanceRef.current && typeof instanceRef.current.destroy === "function") {
      instanceRef.current.destroy();
    }

    const Variant = variantMap[variant] || variantMap.type1;
    instanceRef.current = new Variant(containerRef.current);

    return () => {
      if (instanceRef.current && typeof instanceRef.current.destroy === "function") {
        instanceRef.current.destroy();
      }
    };
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className="relative z-[100] h-full w-full overflow-visible rounded-lg bg-transparent"
    >
      {images.map((image, i) => (
        <div
          key={variant + i}
          className="content__img absolute top-0 left-0 aspect-[1.1] w-[190px] overflow-hidden rounded-[15px] opacity-0 will-change-[transform,filter]"
        >
          <div
            className="content__img-inner absolute top-[-10px] left-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      ))}
    </div>
  );
}

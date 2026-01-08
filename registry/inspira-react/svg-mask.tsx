"use client";

import React, { useRef, useState, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SVGMaskProps {
  className?: string;
  size?: number;
  revealSize?: number;
  /** Content shown in the base (dark) layer */
  base?: ReactNode;
  /** Content revealed through the SVG mask */
  reveal?: ReactNode;
}

export function SVGMask({
  className,
  size = 10,
  revealSize = 600,
  base,
  reveal,
}: SVGMaskProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  const maskSize = isHovered ? revealSize : size;

  function updateMousePosition(event: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen",
        isHovered ? "bg-slate-900" : "bg-white",
        className,
      )}
      onMouseMove={updateMousePosition}
    >
      {/* Masked overlay layer */}
      <div
        style={{
          maskSize: `${maskSize}px`,
          maskPosition: `${mousePosition.x ? mousePosition.x - maskSize / 2 : 0}px ${
            mousePosition.y ? mousePosition.y - maskSize / 2 : 0
          }px`,
          transition: "mask-size 0.2s ease-in-out",
          WebkitMaskImage: "url(https://cdn.inspira-ui.com/images/mask.svg)",
          maskImage: "url(https://cdn.inspira-ui.com/images/mask.svg)",
          WebkitMaskSize: `${maskSize}px`,
          WebkitMaskPosition: `${mousePosition.x ? mousePosition.x - maskSize / 2 : 0}px ${
            mousePosition.y ? mousePosition.y - maskSize / 2 : 0
          }px`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
        className="absolute flex size-full items-center justify-center bg-black text-6xl text-white"
      >
        <div className="absolute inset-0 z-0 size-full bg-black opacity-50" />
        <div
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold text-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {base}
        </div>
      </div>

      {/* Background layer */}
      <div className="flex size-full items-center justify-center text-white">{reveal}</div>
    </div>
  );
}

export default SVGMask;

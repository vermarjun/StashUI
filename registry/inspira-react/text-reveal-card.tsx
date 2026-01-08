"use client";

import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";
import { TextRevealStars } from "@/registry/inspira-react/text-reveal-card-stars";
import React from "react";

interface TextRevealCardProps {
  className?: string;
  starsCount?: number;
  starsClass?: string;
  /** Content shown in the card header (above the reveal area). */
  header?: React.ReactNode;
  /** The text revealed on hover (shown with gradient mask). */
  text?: React.ReactNode;
  /** The text shown underneath / in the "stars" background layer. */
  revealText?: React.ReactNode;
}

export function TextRevealCard({
  className,
  starsCount = 130,
  starsClass,
  header,
  text,
  revealText,
}: TextRevealCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const rotateDeg = useMemo(
    () => (widthPercentage - 50) * 0.1,
    [widthPercentage]
  );

  const mouseMoveHandler = (event: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    setWidthPercentage((relativeX / rect.width) * 100);
  };

  const mouseLeaveHandler = () => {
    setIsMouseOver(false);
    setTimeout(() => {
      setWidthPercentage(0);
    }, 100);
  };

  const mouseEnterHandler = () => {
    setIsMouseOver(true);
  };

  const touchMoveHandler = (event: React.TouchEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = event.touches[0]!.clientX - rect.left;
    setWidthPercentage((relativeX / rect.width) * 100);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative w-full max-w-[640px] overflow-hidden rounded-lg border border-white/[0.08] bg-[#1d1c20] p-4 sm:p-6 md:p-8",
        className
      )}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
    >
      {header}

      <div className="relative flex h-40 items-center overflow-hidden">
        {/* Revealed text layer — clipped to cursor position */}
        <div
          style={{
            width: "100%",
            opacity: widthPercentage > 0 ? 1 : 0,
            clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
            transition: isMouseOver ? "none" : "all 0.4s ease-out",
          }}
          className="absolute z-20 bg-[#1d1c20] will-change-transform"
        >
          {text}
        </div>

        {/* Divider line */}
        <div
          style={{
            left: `${widthPercentage}%`,
            transform: `rotate(${rotateDeg}deg)`,
            opacity: widthPercentage > 0 ? 1 : 0,
            transition: isMouseOver ? "none" : "all 0.4s ease-out",
          }}
          className="absolute z-50 h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent will-change-transform"
        />

        {/* Stars + reveal text backdrop */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          {revealText}
          <TextRevealStars starsCount={starsCount} className={starsClass} />
        </div>
      </div>
    </div>
  );
}

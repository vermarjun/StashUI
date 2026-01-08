"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "top" | "bottom" | "left" | "right" | null;

interface DirectionAwareHoverProps {
  imageUrl: string;
  children?: ReactNode;
  childrenClass?: string;
  imageClass?: string;
  className?: string;
}

function getDirection(ev: { clientX: number; clientY: number }, obj: HTMLElement): number {
  const { width: w, height: h, left, top } = obj.getBoundingClientRect();
  const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
  const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
}

function directionFromCode(code: number): Direction {
  return (["top", "right", "bottom", "left"] as Direction[])[code] ?? "left";
}

export function DirectionAwareHover({
  imageUrl,
  children,
  childrenClass,
  imageClass,
  className,
}: DirectionAwareHoverProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function detectMobile() {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window);
    }
    detectMobile();
    window.addEventListener("resize", detectMobile);
    return () => window.removeEventListener("resize", detectMobile);
  }, []);

  useEffect(() => {
    return () => {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !divRef.current) return;
      setDirection(directionFromCode(getDirection(e, divRef.current)));
    },
    [isMobile],
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setDirection(null);
  }, [isMobile]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isMobile || !divRef.current) return;
      setIsTouched(true);
      const touch = e.touches[0];
      setDirection(directionFromCode(getDirection({ clientX: touch.clientX, clientY: touch.clientY }, divRef.current)));
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
      touchTimerRef.current = setTimeout(() => {
        setDirection(null);
        setIsTouched(false);
      }, 3000);
    },
    [isMobile],
  );

  const handleTouchEnd = useCallback(() => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
    setTimeout(() => {
      setDirection(null);
      setIsTouched(false);
    }, 300);
  }, []);

  // Overlay transform based on direction
  const overlayTranslate: Record<NonNullable<Direction>, string> = {
    top: "-translate-y-full",
    bottom: "translate-y-full",
    left: "-translate-x-full",
    right: "translate-x-full",
  };

  // Image container nudge
  const imageNudge: Record<NonNullable<Direction>, string> = {
    top: "translate-y-2 md:translate-y-5",
    bottom: "-translate-y-2 md:-translate-y-5",
    left: "translate-x-2 md:translate-x-5",
    right: "-translate-x-2 md:-translate-x-5",
  };

  const showOverlay = direction !== null;
  const showChildren = direction !== null || isTouched;

  return (
    <div
      ref={divRef}
      className={cn(
        "group/card relative overflow-hidden rounded-lg bg-transparent transition-all duration-300",
        "h-48 w-48 xs:h-56 xs:w-56 sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96",
        "touch-manipulation active:scale-[0.98] md:active:scale-100",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative size-full overflow-hidden">
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 z-10 transition-all duration-300 bg-black/40 dark:bg-black/60",
            direction ? overlayTranslate[direction] : "",
          )}
          style={{ opacity: showOverlay ? 1 : 0 }}
        />

        {/* Image container */}
        <div
          className={cn(
            "relative size-full bg-gray-50 transition-transform duration-300 dark:bg-black",
            direction ? imageNudge[direction] : "",
          )}
        >
          <img
            src={imageUrl}
            alt="direction aware hover"
            className={cn(
              "h-full w-full object-cover transition-transform duration-300 scale-125 sm:scale-[1.35] md:scale-150",
              imageClass,
            )}
            width={1000}
            height={1000}
          />
        </div>

        {/* Children */}
        <div
          className={cn(
            "absolute z-40 text-white transition-opacity duration-300",
            "bottom-2 left-2 text-sm sm:bottom-3 sm:left-3 sm:text-base md:bottom-4 md:left-4 md:text-lg",
            childrenClass,
          )}
          style={{ opacity: showChildren ? 1 : 0 }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

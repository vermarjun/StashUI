"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius of the radial spotlight in pixels. */
  gradientSize?: number;
  /** Colour of the spotlight. */
  gradientColor?: string;
  /** Opacity of the spotlight overlay (0–1). */
  gradientOpacity?: number;
  /** Additional className for the inner slot wrapper. */
  slotClassName?: string;
}

/**
 * A card with a cursor-following radial spotlight painted over it.
 */
export const CardSpotlight = React.forwardRef<HTMLDivElement, CardSpotlightProps>(
  (
    {
      className,
      slotClassName,
      children,
      gradientSize = 200,
      gradientColor = "#262626",
      gradientOpacity = 0.8,
      ...props
    },
    ref,
  ) => {
    const [mousePos, setMousePos] = React.useState({
      x: -gradientSize * 10,
      y: -gradientSize * 10,
    });

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      },
      [],
    );

    const handleMouseLeave = React.useCallback(() => {
      setMousePos({ x: -gradientSize * 10, y: -gradientSize * 10 });
    }, [gradientSize]);

    const background = `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${gradientColor} 0%, rgba(0,0,0,0) 70%)`;

    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex size-full overflow-hidden rounded-xl border bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white",
          className,
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div className={cn("relative z-10", slotClassName)}>{children}</div>

        {/* Spotlight overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{ background, opacity: gradientOpacity }}
        />
      </div>
    );
  },
);
CardSpotlight.displayName = "CardSpotlight";

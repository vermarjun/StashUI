"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedGradientTextProps
  extends React.ComponentPropsWithoutRef<"span"> {
  /** Tailwind gradient stops, e.g. "from-indigo-500 via-purple-500 to-pink-500". */
  gradient?: string;
  /** Animation speed in seconds. */
  speed?: number;
}

/**
 * Inline text with a smoothly drifting gradient fill.
 */
export const AnimatedGradientText = React.forwardRef<
  HTMLSpanElement,
  AnimatedGradientTextProps
>(
  (
    {
      className,
      gradient = "from-[var(--chart-2)] via-[var(--foreground)] to-[var(--chart-4)]",
      speed = 6,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        style={
          {
            "--gradient-x": `${speed}s`,
            backgroundSize: "200% auto",
            animationDuration: `${speed}s`,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "inline-block animate-gradient-x bg-gradient-to-r bg-clip-text text-transparent [background-size:200%_auto]",
          gradient,
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

AnimatedGradientText.displayName = "AnimatedGradientText";

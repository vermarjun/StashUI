"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Variant helpers (ported from the Vue index.ts)
// ---------------------------------------------------------------------------

export const PATTERN_BACKGROUND_DIRECTION = {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
  TopLeft: "top-left",
  TopRight: "top-right",
  BottomLeft: "bottom-left",
  BottomRight: "bottom-right",
} as const;

export type PatternBackgroundDirection =
  (typeof PATTERN_BACKGROUND_DIRECTION)[keyof typeof PATTERN_BACKGROUND_DIRECTION];

export const PATTERN_BACKGROUND_VARIANT = {
  Grid: "grid",
  Dot: "dot",
  BigDot: "big-dot",
} as const;

export const PATTERN_BACKGROUND_SPEED = {
  Default: 10000,
  Slow: 25000,
  Fast: 5000,
} as const;

export const patternBackgroundVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      grid: "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
      dot: "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",
      "big-dot":
        "bg-[radial-gradient(#d4d4d4_3px,transparent_3px)] dark:bg-[radial-gradient(#404040_3px,transparent_3px)]",
    },
    size: {
      xs: "[background-size:8px_8px]",
      sm: "[background-size:16px_16px]",
      md: "[background-size:24px_24px]",
      lg: "[background-size:32px_32px]",
      xl: "[background-size:40px_40px]",
    },
  },
  defaultVariants: {
    variant: "grid",
    size: "md",
  },
});

export const patternBackgroundMaskVariants = cva(
  "bg-background pointer-events-none absolute inset-0 flex items-center justify-center",
  {
    variants: {
      mask: {
        ellipse:
          "[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        "ellipse-top":
          "[mask-image:radial-gradient(ellipse_at_top,transparent_20%,black)]",
      },
    },
  },
);

// ---------------------------------------------------------------------------
// CSS keyframes injected once (no scoped styles in React)
// ---------------------------------------------------------------------------

const KEYFRAMES = `
@keyframes pb-to-top        { 0% { background-position: 0 100%; } 100% { background-position: 0 0; } }
@keyframes pb-to-bottom     { 0% { background-position: 0 0; }    100% { background-position: 0 100%; } }
@keyframes pb-to-right      { 0% { background-position: 0 0; }    100% { background-position: 100% 0; } }
@keyframes pb-to-left       { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }
@keyframes pb-to-top-right  { 0% { background-position: 0 100%; } 100% { background-position: 100% 0; } }
@keyframes pb-to-top-left   { 0% { background-position: 100% 100%; } 100% { background-position: 0 0; } }
@keyframes pb-to-bottom-right { 0% { background-position: 0 0; }  100% { background-position: 100% 100%; } }
@keyframes pb-to-bottom-left  { 0% { background-position: 100% 0; } 100% { background-position: 0 100%; } }
`;

const DIRECTION_ANIMATION: Record<PatternBackgroundDirection, string> = {
  top: "pb-to-top",
  bottom: "pb-to-bottom",
  right: "pb-to-right",
  left: "pb-to-left",
  "top-right": "pb-to-top-right",
  "top-left": "pb-to-top-left",
  "bottom-right": "pb-to-bottom-right",
  "bottom-left": "pb-to-bottom-left",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface PatternBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof patternBackgroundVariants> {
  animate?: boolean;
  direction?: PatternBackgroundDirection;
  mask?: VariantProps<typeof patternBackgroundMaskVariants>["mask"];
  speed?: number;
}

export const PatternBackground = React.forwardRef<
  HTMLDivElement,
  PatternBackgroundProps
>(
  (
    {
      className,
      children,
      animate = false,
      direction = PATTERN_BACKGROUND_DIRECTION.Top,
      variant,
      size,
      mask,
      speed = PATTERN_BACKGROUND_SPEED.Default,
      style,
      ...props
    },
    ref,
  ) => {
    const animStyle: React.CSSProperties = animate
      ? {
          animationName: DIRECTION_ANIMATION[direction],
          animationDuration: `${speed}ms`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }
      : {};

    return (
      <>
        <style>{KEYFRAMES}</style>
        <div
          ref={ref}
          className={cn(patternBackgroundVariants({ variant, size }), className)}
          style={{ ...animStyle, ...style }}
          {...props}
        >
          {mask && (
            <div className={cn(patternBackgroundMaskVariants({ mask }))} />
          )}
          {children}
        </div>
      </>
    );
  },
);
PatternBackground.displayName = "PatternBackground";

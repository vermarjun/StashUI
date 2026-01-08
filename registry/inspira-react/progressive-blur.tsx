"use client";

import * as React from "react";
import { motion, type MotionProps } from "motion/react";
import { cn } from "@/lib/utils";

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

export type ProgressiveBlurDirection = keyof typeof GRADIENT_ANGLES;

export interface ProgressiveBlurProps
  extends Omit<MotionProps, "children">,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  direction?: ProgressiveBlurDirection;
  blurLayers?: number;
  blurIntensity?: number;
  children?: React.ReactNode;
}

export const ProgressiveBlur = React.forwardRef<
  HTMLDivElement,
  ProgressiveBlurProps
>(
  (
    {
      direction = "bottom",
      blurLayers = 8,
      blurIntensity = 0.25,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const layers = Math.max(blurLayers, 2);
    const segmentSize = 1 / (blurLayers + 1);

    const getGradientStyle = (index: number): string => {
      const gradientStops = [
        (index - 1) * segmentSize,
        index * segmentSize,
        (index + 1) * segmentSize,
        (index + 2) * segmentSize,
      ].map(
        (pos, posIndex) =>
          `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
      );
      return `linear-gradient(${GRADIENT_ANGLES[direction]}deg, ${gradientStops.join(", ")})`;
    };

    // Detect if the caller passed a position class
    const hasPositionClass =
      typeof className === "string" &&
      /\b(absolute|fixed|relative|sticky|static)\b/.test(className);

    return (
      <div
        ref={ref}
        className={cn(!hasPositionClass && "relative", className)}
        style={style}
      >
        {children}
        {Array.from({ length: layers }, (_, i) => i + 1).map((index) => {
          const gradient = getGradientStyle(index);
          return (
            <motion.div
              key={index}
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                maskImage: gradient,
                WebkitMaskImage: gradient,
                backdropFilter: `blur(${(index - 1) * blurIntensity}px)`,
              }}
              {...rest}
            />
          );
        })}
      </div>
    );
  },
);
ProgressiveBlur.displayName = "ProgressiveBlur";

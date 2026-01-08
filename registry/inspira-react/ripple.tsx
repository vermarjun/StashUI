"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const KEYFRAMES = `
@keyframes ripple-effect {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50%       { transform: translate(-50%, -50%) scale(0.9); }
}
`;

// ---------------------------------------------------------------------------
// RippleCircle (internal helper)
// ---------------------------------------------------------------------------

interface RippleCircleProps {
  size?: number;
  opacity?: number;
  animationDelay?: number;
  borderStyle?: string;
  className?: string;
}

const RippleCircle: React.FC<RippleCircleProps> = ({
  size = 210,
  opacity = 0.24,
  animationDelay = 0,
  borderStyle = "solid",
  className,
}) => {
  return (
    <div
      className={cn("absolute shadow-xl rounded-full border", className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        opacity,
        top: "50%",
        left: "50%",
        borderStyle,
        borderWidth: "1px",
        transform: "translate(-50%, -50%) scale(1)",
        animation: `ripple-effect 2s ease-in-out ${animationDelay}ms infinite`,
      }}
    />
  );
};

// ---------------------------------------------------------------------------
// Ripple
// ---------------------------------------------------------------------------

export interface RippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Base diameter of the innermost circle in px (default: 210). */
  baseCircleSize?: number;
  /** Opacity of the innermost circle (default: 0.24). */
  baseCircleOpacity?: number;
  /** Gap between circles in px (default: 70). */
  spaceBetweenCircle?: number;
  /** Opacity reduction per circle (default: 0.03). */
  circleOpacityDowngradeRatio?: number;
  /** Delay increment between circles in ms (default: 80). */
  waveSpeed?: number;
  /** Number of concentric circles (default: 7). */
  numberOfCircles?: number;
  /** Extra className applied to each circle. */
  circleClass?: string;
}

export const Ripple = React.forwardRef<HTMLDivElement, RippleProps>(
  (
    {
      className,
      baseCircleSize = 210,
      baseCircleOpacity = 0.24,
      spaceBetweenCircle = 70,
      circleOpacityDowngradeRatio = 0.03,
      waveSpeed = 80,
      numberOfCircles = 7,
      circleClass,
      ...props
    },
    ref,
  ) => {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <div ref={ref} className={cn("absolute inset-0", className)} {...props}>
          {Array.from({ length: numberOfCircles }, (_, i) => i + 1).map(
            (index) => (
              <RippleCircle
                key={index}
                size={baseCircleSize + index * spaceBetweenCircle}
                opacity={baseCircleOpacity - index * circleOpacityDowngradeRatio}
                animationDelay={index * waveSpeed}
                borderStyle={index === numberOfCircles - 1 ? "dashed" : "solid"}
                className={circleClass}
              />
            ),
          )}
        </div>
      </>
    );
  },
);
Ripple.displayName = "Ripple";

// ---------------------------------------------------------------------------
// RippleContainer (convenience wrapper — matches Vue's RippleContainer.vue)
// ---------------------------------------------------------------------------

export interface RippleContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  rippleProps?: RippleProps;
}

export const RippleContainer = React.forwardRef<
  HTMLDivElement,
  RippleContainerProps
>(({ children, rippleProps, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {children}
      <Ripple {...rippleProps} />
    </div>
  );
});
RippleContainer.displayName = "RippleContainer";

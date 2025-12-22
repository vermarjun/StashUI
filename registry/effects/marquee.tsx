"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Scroll vertically instead of horizontally. */
  vertical?: boolean;
  /** Reverse the scroll direction. */
  reverse?: boolean;
  /** Pause the animation on hover. */
  pauseOnHover?: boolean;
  /** Number of times to repeat the children for a seamless loop. */
  repeat?: number;
}

/**
 * An infinite, seamless marquee. Wrap any set of children; they scroll
 * forever. Set `--duration` and `--gap` via style to tune speed/spacing.
 */
export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      vertical = false,
      reverse = false,
      pauseOnHover = false,
      repeat = 4,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={
          {
            "--duration": "40s",
            "--gap": "1rem",
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "group flex overflow-hidden p-2 [gap:var(--gap)]",
          vertical ? "flex-col" : "flex-row",
          className,
        )}
        {...props}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
      </div>
    );
  },
);

Marquee.displayName = "Marquee";

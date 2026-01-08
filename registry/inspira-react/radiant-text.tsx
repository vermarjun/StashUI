"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const KEYFRAMES = `
@keyframes radiant {
  0%, 90%, 100% {
    background-position: calc(-100% - var(--radiant-width)) 0;
  }
  30%, 60% {
    background-position: calc(100% + var(--radiant-width)) 0;
  }
}
.radiant-animation {
  animation: radiant var(--radiant-anim-duration) infinite;
}
`;

export interface RadiantTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Animation cycle duration in seconds (default: 10). */
  duration?: number;
  /** Width of the radiant highlight in px (default: 100). */
  radiantWidth?: number;
}

export const RadiantText = React.forwardRef<HTMLParagraphElement, RadiantTextProps>(
  ({ className, children, duration = 10, radiantWidth = 100, style, ...props }, ref) => {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <p
          ref={ref}
          style={
            {
              "--radiant-anim-duration": `${duration}s`,
              "--radiant-width": `${radiantWidth}px`,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "radiant-animation",
            "mx-auto max-w-md",
            "bg-gradient-to-r from-transparent via-black via-50% to-transparent",
            "bg-[length:var(--radiant-width)_100%] bg-clip-text bg-no-repeat",
            "[background-position:0_0]",
            "text-neutral-600/70",
            "dark:via-white dark:text-neutral-400/70",
            className,
          )}
          {...props}
        >
          {children}
        </p>
      </>
    );
  },
);
RadiantText.displayName = "RadiantText";

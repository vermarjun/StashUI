"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const KEYFRAMES = `
@keyframes rainbow-bg {
  0%   { background-position: 0; }
  100% { background-position: 200%; }
}
.rainbow-button-anim,
.rainbow-button-anim::before {
  animation: rainbow-bg var(--rb-speed) infinite linear;
}
`;

export interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Animation speed in seconds (default: 2). */
  speed?: number;
  /** Render as a different element, e.g. "a". Defaults to "button". */
  as?: React.ElementType;
}

export const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  RainbowButtonProps
>(({ className, children, speed = 2, as: Tag = "button", style, ...props }, ref) => {
  return (
    <>
      <style>{KEYFRAMES}</style>
      {/* @ts-expect-error polymorphic `as` prop */}
      <Tag
        ref={ref}
        style={
          {
            "--rb-speed": `${speed}s`,
            "--color-1": "hsl(0 100% 63%)",
            "--color-2": "hsl(270 100% 63%)",
            "--color-3": "hsl(210 100% 63%)",
            "--color-4": "hsl(195 100% 63%)",
            "--color-5": "hsl(90 100% 63%)",
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          "rainbow-button-anim",
          // Layout
          "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl px-8 py-2",
          // Typography
          "font-medium text-primary-foreground",
          // Border trick: three layered backgrounds
          "[border:calc(0.08*1rem)_solid_transparent]",
          "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          "bg-[size:200%]",
          "[background-clip:padding-box,border-box,border-box]",
          "[background-origin:border-box]",
          // Dark variant
          "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          // Glow ::before
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5",
          "before:-translate-x-1/2",
          "before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          "before:bg-[size:200%]",
          "before:[filter:blur(calc(0.8*1rem))]",
          // States
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    </>
  );
});
RainbowButton.displayName = "RainbowButton";

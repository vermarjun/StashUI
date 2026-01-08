"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const KEYFRAMES = `
@keyframes rippling {
  0%   { opacity: 1; transform: scale(0); }
  100% { opacity: 0; transform: scale(2); }
}
`;

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Color of the ripple overlay (default: "#ADD8E6"). */
  rippleColor?: string;
  /** Duration of the ripple animation in ms (default: 600). */
  duration?: number;
}

interface RippleEntry {
  x: number;
  y: number;
  size: number;
  key: number;
}

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      className,
      children,
      rippleColor = "#ADD8E6",
      duration = 600,
      onClick,
      style,
      ...props
    },
    ref,
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);
    const [ripples, setRipples] = React.useState<RippleEntry[]>([]);

    // Merge forwarded ref with internal ref
    React.useImperativeHandle(ref, () => buttonRef.current!);

    function createRipple(event: React.MouseEvent<HTMLButtonElement>) {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      const key = Date.now() + Math.random();

      setRipples((prev) => [...prev, { x, y, size, key }]);

      // Auto-remove after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.key !== key));
      }, duration);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
      createRipple(event);
      onClick?.(event);
    }

    return (
      <>
        <style>{KEYFRAMES}</style>
        <button
          ref={buttonRef}
          style={{ "--ripple-duration": `${duration}ms`, ...style } as React.CSSProperties}
          className={cn(
            "relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 px-4 py-2 text-center",
            "bg-background text-primary",
            className,
          )}
          onClick={handleClick}
          {...props}
        >
          <span className="relative z-10">{children}</span>

          <span className="pointer-events-none absolute inset-0">
            {ripples.map((ripple) => (
              <span
                key={ripple.key}
                className="absolute rounded-full opacity-30"
                style={{
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  transform: "scale(0)",
                  animation: `rippling ${duration}ms ease-out`,
                }}
              />
            ))}
          </span>
        </button>
      </>
    );
  },
);
RippleButton.displayName = "RippleButton";

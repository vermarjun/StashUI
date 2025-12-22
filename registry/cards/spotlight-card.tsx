"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /** Radius of the spotlight in pixels. */
  radius?: number;
  /** Spotlight color (any valid CSS color). */
  color?: string;
}

/**
 * A card with a cursor-following radial spotlight on its border/surface.
 * The spotlight is driven by CSS variables updated on pointer move.
 */
export const SpotlightCard = React.forwardRef<
  HTMLDivElement,
  SpotlightCardProps
>(
  (
    {
      radius = 350,
      color = "color-mix(in oklch, var(--foreground) 12%, transparent)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const localRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);
    const [active, setActive] = React.useState(false);

    const onMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    }, []);

    return (
      <div
        ref={localRef}
        onMouseMove={onMove}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        style={
          {
            "--radius": `${radius}px`,
            "--spotlight": color,
          } as React.CSSProperties
        }
        className={cn(
          "group relative overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: active ? 1 : 0,
            background:
              "radial-gradient(var(--radius) circle at var(--x) var(--y), var(--spotlight), transparent 70%)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    );
  },
);

SpotlightCard.displayName = "SpotlightCard";

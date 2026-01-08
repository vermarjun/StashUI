"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BorderBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the beam head (px). */
  size?: number;
  /** Full rotation duration in milliseconds. */
  duration?: number;
  /** Beam width in px. */
  borderWidth?: number;
  /** Anchor position along the border (percentage). */
  anchor?: number;
  /** Start colour of the gradient beam. */
  colorFrom?: string;
  /** End colour of the gradient beam. */
  colorTo?: string;
  /** Animation start delay in milliseconds. */
  delay?: number;
}

/**
 * Animates a glowing beam that travels along the border of its parent
 * element. Drop it inside any `relative` container with a `rounded-*` class.
 */
export const BorderBeam = React.forwardRef<HTMLDivElement, BorderBeamProps>(
  (
    {
      className,
      size = 200,
      duration = 15000,
      anchor = 90,
      borderWidth = 1.5,
      colorFrom = "#ffaa40",
      colorTo = "#9c40ff",
      delay = 0,
      style,
      ...props
    },
    ref,
  ) => {
    const durationSec = `${duration / 1000}s`;
    const delaySec = `${delay / 1000}s`;

    return (
      <>
        <style>{`
          @keyframes border-beam-anim {
            to { offset-distance: 100%; }
          }
        `}</style>
        <div
          ref={ref}
          style={
            {
              "--size": size,
              "--duration": durationSec,
              "--anchor": anchor,
              "--border-width": borderWidth,
              "--color-from": colorFrom,
              "--color-to": colorTo,
              "--delay": `-${delaySec}`,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            // Base: transparent border + mask to reveal only the border strip
            "pointer-events-none absolute inset-0 rounded-[inherit]",
            "[border:calc(var(--border-width)*1px)_solid_transparent]",
            "[mask-clip:padding-box,border-box]",
            "[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
            // Beam element via ::after
            "after:absolute after:aspect-square",
            "after:w-[calc(var(--size)*1px)]",
            "after:[animation-delay:var(--delay)]",
            "after:[animation:border-beam-anim_var(--duration)_infinite_linear]",
            "after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
            "after:[offset-anchor:calc(var(--anchor)*1%)_50%]",
            "after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
            className,
          )}
          {...props}
        />
      </>
    );
  },
);
BorderBeam.displayName = "BorderBeam";

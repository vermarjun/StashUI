"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export interface GradientButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  /** Render as a child element (e.g. an anchor) instead of a button. */
  asChild?: boolean;
}

/**
 * A pill button with an animated gradient border and a soft inner glow.
 * The gradient drifts continuously using the `gradient-x` keyframes.
 */
export const GradientButton = React.forwardRef<
  HTMLButtonElement,
  GradientButtonProps
>(({ className, children, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <div className="group relative inline-flex rounded-full p-[1.5px] [background:linear-gradient(110deg,var(--chart-2),var(--chart-4),var(--foreground),var(--chart-2))] [background-size:200%_auto] animate-gradient-x">
      <Comp
        ref={ref}
        className={cn(
          "relative inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-background px-5 text-sm font-medium text-foreground",
          "transition-colors duration-300 group-hover:bg-background/80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </div>
  );
});

GradientButton.displayName = "GradientButton";

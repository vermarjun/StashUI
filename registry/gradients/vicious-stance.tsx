import * as React from "react";
import { cn } from "@/lib/utils";

/** "Vicious Stance" gradient. */
export const GradientViciousStance_CSS = "linear-gradient(60deg, #29323c 0%, #485563 100%)";

export function GradientViciousStance({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(60deg, #29323c 0%, #485563 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Mountain Rock" gradient. */
export const GradientMountainRock_CSS = "linear-gradient(0deg, #868f96 0%, #596164 100%)";

export function GradientMountainRock({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #868f96 0%, #596164 100%)", ...style }}
      {...props}
    />
  );
}

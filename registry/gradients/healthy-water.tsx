import * as React from "react";
import { cn } from "@/lib/utils";

/** "Healthy Water" gradient. */
export const GradientHealthyWater_CSS = "linear-gradient(60deg, #96deda 0%, #50c9c3 100%)";

export function GradientHealthyWater({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(60deg, #96deda 0%, #50c9c3 100%)", ...style }}
      {...props}
    />
  );
}

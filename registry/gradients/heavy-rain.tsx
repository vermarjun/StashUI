import * as React from "react";
import { cn } from "@/lib/utils";

/** "Heavy Rain" gradient. */
export const GradientHeavyRain_CSS = "linear-gradient(0deg, #cfd9df 0%, #e2ebf0 100%)";

export function GradientHeavyRain({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #cfd9df 0%, #e2ebf0 100%)", ...style }}
      {...props}
    />
  );
}

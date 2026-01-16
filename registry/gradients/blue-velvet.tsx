import * as React from "react";
import { cn } from "@/lib/utils";

/** "Blue Velvet" gradient. */
export const GradientBlueVelvet_CSS = "linear-gradient(0deg, #6a11cb 0%, #2575fc 100%)";

export function GradientBlueVelvet({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #6a11cb 0%, #2575fc 100%)", ...style }}
      {...props}
    />
  );
}

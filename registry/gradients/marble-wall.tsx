import * as React from "react";
import { cn } from "@/lib/utils";

/** "Marble Wall" gradient. */
export const GradientMarbleWall_CSS = "linear-gradient(0deg, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%)";

export function GradientMarbleWall({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #bdc2e8 0%, #bdc2e8 1%, #e6dee9 100%)", ...style }}
      {...props}
    />
  );
}

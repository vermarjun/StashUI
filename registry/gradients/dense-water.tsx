import * as React from "react";
import { cn } from "@/lib/utils";

/** "Dense Water" gradient. */
export const GradientDenseWater_CSS = "linear-gradient(0deg, #3ab5b0 0%, #3d99be 31%, #56317a 100%)";

export function GradientDenseWater({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #3ab5b0 0%, #3d99be 31%, #56317a 100%)", ...style }}
      {...props}
    />
  );
}

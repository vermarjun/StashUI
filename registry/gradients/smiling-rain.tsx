import * as React from "react";
import { cn } from "@/lib/utils";

/** "Smiling Rain" gradient. */
export const GradientSmilingRain_CSS = "linear-gradient(-20deg, #dcb0ed 0%, #99c99c 100%)";

export function GradientSmilingRain({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #dcb0ed 0%, #99c99c 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Strong Stick" gradient. */
export const GradientStrongStick_CSS = "linear-gradient(0deg, #a8caba 0%, #5d4157 100%)";

export function GradientStrongStick({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #a8caba 0%, #5d4157 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Glass Water" gradient. */
export const GradientGlassWater_CSS = "linear-gradient(0deg, #dfe9f3 0%, #ffffff 100%)";

export function GradientGlassWater({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #dfe9f3 0%, #ffffff 100%)", ...style }}
      {...props}
    />
  );
}

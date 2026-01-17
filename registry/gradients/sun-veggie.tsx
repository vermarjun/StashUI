import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sun Veggie" gradient. */
export const GradientSunVeggie_CSS = "linear-gradient(-225deg, #20E2D7 0%, #F9FEA5 100%)";

export function GradientSunVeggie({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #20E2D7 0%, #F9FEA5 100%)", ...style }}
      {...props}
    />
  );
}

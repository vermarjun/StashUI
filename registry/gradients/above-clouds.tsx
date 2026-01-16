import * as React from "react";
import { cn } from "@/lib/utils";

/** "Above Clouds" gradient. */
export const GradientAboveClouds_CSS = "linear-gradient(0deg, #BDBBBE 0%, #9D9EA3 100%)";

export function GradientAboveClouds({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #BDBBBE 0%, #9D9EA3 100%)", ...style }}
      {...props}
    />
  );
}

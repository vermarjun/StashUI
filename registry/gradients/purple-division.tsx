import * as React from "react";
import { cn } from "@/lib/utils";

/** "Purple Division" gradient. */
export const GradientPurpleDivision_CSS = "linear-gradient(0deg, #7028e4 0%, #e5b2ca 100%)";

export function GradientPurpleDivision({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #7028e4 0%, #e5b2ca 100%)", ...style }}
      {...props}
    />
  );
}

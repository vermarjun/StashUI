import * as React from "react";
import { cn } from "@/lib/utils";

/** "Mean Fruit" gradient. */
export const GradientMeanFruit_CSS = "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)";

export function GradientMeanFruit({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "New York" gradient. */
export const GradientNewYork_CSS = "linear-gradient(0deg, #fff1eb 0%, #ace0f9 100%)";

export function GradientNewYork({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #fff1eb 0%, #ace0f9 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Phoenix Start" gradient. */
export const GradientPhoenixStart_CSS = "linear-gradient(0deg, #f83600 0%, #f9d423 100%)";

export function GradientPhoenixStart({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #f83600 0%, #f9d423 100%)", ...style }}
      {...props}
    />
  );
}

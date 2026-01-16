import * as React from "react";
import { cn } from "@/lib/utils";

/** "Happy Fisher" gradient. */
export const GradientHappyFisher_CSS = "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)";

export function GradientHappyFisher({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)", ...style }}
      {...props}
    />
  );
}

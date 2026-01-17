import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sand Strike" gradient. */
export const GradientSandStrike_CSS = "linear-gradient(0deg, #c1c161 0%, #c1c161 0%, #d4d4b1 100%)";

export function GradientSandStrike({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #c1c161 0%, #c1c161 0%, #d4d4b1 100%)", ...style }}
      {...props}
    />
  );
}

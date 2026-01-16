import * as React from "react";
import { cn } from "@/lib/utils";

/** "Frozen Berry" gradient. */
export const GradientFrozenBerry_CSS = "linear-gradient(0deg, #e8198b 0%, #c7eafd 100%)";

export function GradientFrozenBerry({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #e8198b 0%, #c7eafd 100%)", ...style }}
      {...props}
    />
  );
}

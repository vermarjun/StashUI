import * as React from "react";
import { cn } from "@/lib/utils";

/** "Ripe Malinka" gradient. */
export const GradientRipeMalinka_CSS = "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)";

export function GradientRipeMalinka({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)", ...style }}
      {...props}
    />
  );
}

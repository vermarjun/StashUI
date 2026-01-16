import * as React from "react";
import { cn } from "@/lib/utils";

/** "African Field" gradient. */
export const GradientAfricanField_CSS = "linear-gradient(0deg, #65bd60 0%, #5ac1a8 25%, #3ec6ed 50%)";

export function GradientAfricanField({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #65bd60 0%, #5ac1a8 25%, #3ec6ed 50%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Everlasting Sky" gradient. */
export const GradientEverlastingSky_CSS = "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)";

export function GradientEverlastingSky({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)", ...style }}
      {...props}
    />
  );
}

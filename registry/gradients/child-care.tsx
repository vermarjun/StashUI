import * as React from "react";
import { cn } from "@/lib/utils";

/** "Child Care" gradient. */
export const GradientChildCare_CSS = "linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)";

export function GradientChildCare({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #f794a4 0%, #fdd6bd 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Gagarin View" gradient. */
export const GradientGagarinView_CSS = "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)";

export function GradientGagarinView({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)", ...style }}
      {...props}
    />
  );
}

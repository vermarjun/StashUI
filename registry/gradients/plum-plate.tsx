import * as React from "react";
import { cn } from "@/lib/utils";

/** "Plum Plate" gradient. */
export const GradientPlumPlate_CSS = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

export function GradientPlumPlate({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", ...style }}
      {...props}
    />
  );
}

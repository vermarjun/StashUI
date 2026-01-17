import * as React from "react";
import { cn } from "@/lib/utils";

/** "Soft Lipstick" gradient. */
export const GradientSoftLipstick_CSS = "linear-gradient(-225deg, #B6CEE8 0%, #F578DC 100%)";

export function GradientSoftLipstick({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #B6CEE8 0%, #F578DC 100%)", ...style }}
      {...props}
    />
  );
}

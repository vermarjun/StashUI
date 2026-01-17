import * as React from "react";
import { cn } from "@/lib/utils";

/** "Perfect Blue" gradient. */
export const GradientPerfectBlue_CSS = "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)";

export function GradientPerfectBlue({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)", ...style }}
      {...props}
    />
  );
}

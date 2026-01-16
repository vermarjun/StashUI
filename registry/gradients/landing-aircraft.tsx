import * as React from "react";
import { cn } from "@/lib/utils";

/** "Landing Aircraft" gradient. */
export const GradientLandingAircraft_CSS = "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)";

export function GradientLandingAircraft({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)", ...style }}
      {...props}
    />
  );
}

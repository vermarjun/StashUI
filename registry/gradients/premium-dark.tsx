import * as React from "react";
import { cn } from "@/lib/utils";

/** "Premium Dark" gradient. */
export const GradientPremiumDark_CSS = "linear-gradient(0deg, #434343 0%, #000000 100%)";

export function GradientPremiumDark({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #434343 0%, #000000 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Premium White" gradient. */
export const GradientPremiumWhite_CSS = "linear-gradient(0deg, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%)";

export function GradientPremiumWhite({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%)", ...style }}
      {...props}
    />
  );
}

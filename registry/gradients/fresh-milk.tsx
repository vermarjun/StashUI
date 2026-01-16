import * as React from "react";
import { cn } from "@/lib/utils";

/** "Fresh Milk" gradient. */
export const GradientFreshMilk_CSS = "linear-gradient(0deg, #feada6 0%, #f5efef 100%)";

export function GradientFreshMilk({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #feada6 0%, #f5efef 100%)", ...style }}
      {...props}
    />
  );
}

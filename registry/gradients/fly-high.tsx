import * as React from "react";
import { cn } from "@/lib/utils";

/** "Fly High" gradient. */
export const GradientFlyHigh_CSS = "linear-gradient(0deg, #48c6ef 0%, #6f86d6 100%)";

export function GradientFlyHigh({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #48c6ef 0%, #6f86d6 100%)", ...style }}
      {...props}
    />
  );
}

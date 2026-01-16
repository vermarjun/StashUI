import * as React from "react";
import { cn } from "@/lib/utils";

/** "Hidden Jaguar" gradient. */
export const GradientHiddenJaguar_CSS = "linear-gradient(0deg, #0fd850 0%, #f9f047 100%)";

export function GradientHiddenJaguar({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #0fd850 0%, #f9f047 100%)", ...style }}
      {...props}
    />
  );
}

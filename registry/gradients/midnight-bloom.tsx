import * as React from "react";
import { cn } from "@/lib/utils";

/** "Midnight Bloom" gradient. */
export const GradientMidnightBloom_CSS = "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)";

export function GradientMidnightBloom({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)", ...style }}
      {...props}
    />
  );
}

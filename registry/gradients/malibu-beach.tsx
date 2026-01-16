import * as React from "react";
import { cn } from "@/lib/utils";

/** "Malibu Beach" gradient. */
export const GradientMalibuBeach_CSS = "linear-gradient(0deg, #4facfe 0%, #00f2fe 100%)";

export function GradientMalibuBeach({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #4facfe 0%, #00f2fe 100%)", ...style }}
      {...props}
    />
  );
}

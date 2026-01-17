import * as React from "react";
import { cn } from "@/lib/utils";

/** "Passionate Bed" gradient. */
export const GradientPassionateBed_CSS = "linear-gradient(0deg, #ff758c 0%, #ff7eb3 100%)";

export function GradientPassionateBed({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ff758c 0%, #ff7eb3 100%)", ...style }}
      {...props}
    />
  );
}

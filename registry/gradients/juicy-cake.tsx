import * as React from "react";
import { cn } from "@/lib/utils";

/** "Juicy Cake" gradient. */
export const GradientJuicyCake_CSS = "linear-gradient(0deg, #e14fad 0%, #f9d423 100%)";

export function GradientJuicyCake({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #e14fad 0%, #f9d423 100%)", ...style }}
      {...props}
    />
  );
}

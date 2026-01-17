import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sunny Morning" gradient. */
export const GradientSunnyMorning_CSS = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";

export function GradientSunnyMorning({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)", ...style }}
      {...props}
    />
  );
}

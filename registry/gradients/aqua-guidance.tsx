import * as React from "react";
import { cn } from "@/lib/utils";

/** "Aqua Guidance" gradient. */
export const GradientAquaGuidance_CSS = "linear-gradient(0deg, #007adf 0%, #00ecbc 100%)";

export function GradientAquaGuidance({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #007adf 0%, #00ecbc 100%)", ...style }}
      {...props}
    />
  );
}

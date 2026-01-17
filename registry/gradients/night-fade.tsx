import * as React from "react";
import { cn } from "@/lib/utils";

/** "Night Fade" gradient. */
export const GradientNightFade_CSS = "linear-gradient(0deg, #a18cd1 0%, #fbc2eb 100%)";

export function GradientNightFade({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #a18cd1 0%, #fbc2eb 100%)", ...style }}
      {...props}
    />
  );
}

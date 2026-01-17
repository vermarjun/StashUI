import * as React from "react";
import { cn } from "@/lib/utils";

/** "Shy Rainbow" gradient. */
export const GradientShyRainbow_CSS = "linear-gradient(0deg, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%)";

export function GradientShyRainbow({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #eea2a2 0%, #bbc1bf 19%, #57c6e1 42%)", ...style }}
      {...props}
    />
  );
}

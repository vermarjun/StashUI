import * as React from "react";
import { cn } from "@/lib/utils";

/** "Snow Again" gradient. */
export const GradientSnowAgain_CSS = "linear-gradient(0deg, #e6e9f0 0%, #eef1f5 100%)";

export function GradientSnowAgain({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #e6e9f0 0%, #eef1f5 100%)", ...style }}
      {...props}
    />
  );
}

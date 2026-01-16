import * as React from "react";
import { cn } from "@/lib/utils";

/** "Happy Memories" gradient. */
export const GradientHappyMemories_CSS = "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)";

export function GradientHappyMemories({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)", ...style }}
      {...props}
    />
  );
}

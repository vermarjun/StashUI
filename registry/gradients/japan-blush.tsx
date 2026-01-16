import * as React from "react";
import { cn } from "@/lib/utils";

/** "Japan Blush" gradient. */
export const GradientJapanBlush_CSS = "linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)";

export function GradientJapanBlush({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)", ...style }}
      {...props}
    />
  );
}

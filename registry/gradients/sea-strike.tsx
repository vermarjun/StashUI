import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sea Strike" gradient. */
export const GradientSeaStrike_CSS = "linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%)";

export function GradientSeaStrike({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%)", ...style }}
      {...props}
    />
  );
}

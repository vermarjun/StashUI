import * as React from "react";
import { cn } from "@/lib/utils";

/** "Night Call" gradient. */
export const GradientNightCall_CSS = "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)";

export function GradientNightCall({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Lily Meadow" gradient. */
export const GradientLilyMeadow_CSS = "linear-gradient(-225deg, #65379B 0%, #886AEA 53%, #6457C6 100%)";

export function GradientLilyMeadow({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #65379B 0%, #886AEA 53%, #6457C6 100%)", ...style }}
      {...props}
    />
  );
}

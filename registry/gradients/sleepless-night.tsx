import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sleepless Night" gradient. */
export const GradientSleeplessNight_CSS = "linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)";

export function GradientSleeplessNight({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)", ...style }}
      {...props}
    />
  );
}

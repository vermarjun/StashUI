import * as React from "react";
import { cn } from "@/lib/utils";

/** "Arielles Smile" gradient. */
export const GradientAriellesSmile_CSS = "linear-gradient(0deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)";

export function GradientAriellesSmile({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)", ...style }}
      {...props}
    />
  );
}

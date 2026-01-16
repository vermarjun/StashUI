import * as React from "react";
import { cn } from "@/lib/utils";

/** "Deep Relief" gradient. */
export const GradientDeepRelief_CSS = "linear-gradient(-225deg, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%)";

export function GradientDeepRelief({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%)", ...style }}
      {...props}
    />
  );
}

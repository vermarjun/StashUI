import * as React from "react";
import { cn } from "@/lib/utils";

/** "Supreme Sky" gradient. */
export const GradientSupremeSky_CSS = "linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%)";

export function GradientSupremeSky({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #D4FFEC 0%, #57F2CC 48%, #4596FB 100%)", ...style }}
      {...props}
    />
  );
}

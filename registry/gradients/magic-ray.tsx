import * as React from "react";
import { cn } from "@/lib/utils";

/** "Magic Ray" gradient. */
export const GradientMagicRay_CSS = "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)";

export function GradientMagicRay({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #FF3CAC 0%, #562B7C 52%, #2B86C5 100%)", ...style }}
      {...props}
    />
  );
}

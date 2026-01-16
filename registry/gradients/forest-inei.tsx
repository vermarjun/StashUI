import * as React from "react";
import { cn } from "@/lib/utils";

/** "Forest Inei" gradient. */
export const GradientForestInei_CSS = "linear-gradient(0deg, #df89b5 0%, #bfd9fe 100%)";

export function GradientForestInei({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #df89b5 0%, #bfd9fe 100%)", ...style }}
      {...props}
    />
  );
}

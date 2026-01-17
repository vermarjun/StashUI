import * as React from "react";
import { cn } from "@/lib/utils";

/** "Wide Matrix" gradient. */
export const GradientWideMatrix_CSS = "linear-gradient(0deg, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)";

export function GradientWideMatrix({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)", ...style }}
      {...props}
    />
  );
}

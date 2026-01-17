import * as React from "react";
import { cn } from "@/lib/utils";

/** "Witch Dance" gradient. */
export const GradientWitchDance_CSS = "linear-gradient(-225deg, #A8BFFF 0%, #884D80 100%)";

export function GradientWitchDance({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #A8BFFF 0%, #884D80 100%)", ...style }}
      {...props}
    />
  );
}

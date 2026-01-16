import * as React from "react";
import { cn } from "@/lib/utils";

/** "Fresh Oasis" gradient. */
export const GradientFreshOasis_CSS = "linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)";

export function GradientFreshOasis({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)", ...style }}
      {...props}
    />
  );
}

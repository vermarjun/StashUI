import * as React from "react";
import { cn } from "@/lib/utils";

/** "Royal Garden" gradient. */
export const GradientRoyalGarden_CSS = "linear-gradient(0deg, #ed6ea0 0%, #ec8c69 100%)";

export function GradientRoyalGarden({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ed6ea0 0%, #ec8c69 100%)", ...style }}
      {...props}
    />
  );
}

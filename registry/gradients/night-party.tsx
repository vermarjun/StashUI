import * as React from "react";
import { cn } from "@/lib/utils";

/** "Night Party" gradient. */
export const GradientNightParty_CSS = "linear-gradient(0deg, #0250c5 0%, #d43f8d 100%)";

export function GradientNightParty({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #0250c5 0%, #d43f8d 100%)", ...style }}
      {...props}
    />
  );
}

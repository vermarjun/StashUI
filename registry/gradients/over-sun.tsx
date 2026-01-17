import * as React from "react";
import { cn } from "@/lib/utils";

/** "Over Sun" gradient. */
export const GradientOverSun_CSS = "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)";

export function GradientOverSun({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)", ...style }}
      {...props}
    />
  );
}

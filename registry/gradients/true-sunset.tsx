import * as React from "react";
import { cn } from "@/lib/utils";

/** "True Sunset" gradient. */
export const GradientTrueSunset_CSS = "linear-gradient(0deg, #fa709a 0%, #fee140 100%)";

export function GradientTrueSunset({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #fa709a 0%, #fee140 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Awesome Pine" gradient. */
export const GradientAwesomePine_CSS = "linear-gradient(0deg, #ebbba7 0%, #cfc7f8 100%)";

export function GradientAwesomePine({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ebbba7 0%, #cfc7f8 100%)", ...style }}
      {...props}
    />
  );
}

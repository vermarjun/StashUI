import * as React from "react";
import { cn } from "@/lib/utils";

/** "Love Kiss" gradient. */
export const GradientLoveKiss_CSS = "linear-gradient(0deg, #ff0844 0%, #ffb199 100%)";

export function GradientLoveKiss({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ff0844 0%, #ffb199 100%)", ...style }}
      {...props}
    />
  );
}

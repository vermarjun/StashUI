import * as React from "react";
import { cn } from "@/lib/utils";

/** "Big Mango" gradient. */
export const GradientBigMango_CSS = "linear-gradient(0deg, #c71d6f 0%, #d09693 100%)";

export function GradientBigMango({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #c71d6f 0%, #d09693 100%)", ...style }}
      {...props}
    />
  );
}

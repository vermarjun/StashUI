import * as React from "react";
import { cn } from "@/lib/utils";

/** "Wild Apple" gradient. */
export const GradientWildApple_CSS = "linear-gradient(0deg, #d299c2 0%, #fef9d7 100%)";

export function GradientWildApple({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #d299c2 0%, #fef9d7 100%)", ...style }}
      {...props}
    />
  );
}

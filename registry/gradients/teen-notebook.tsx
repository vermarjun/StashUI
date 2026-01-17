import * as React from "react";
import { cn } from "@/lib/utils";

/** "Teen Notebook" gradient. */
export const GradientTeenNotebook_CSS = "linear-gradient(0deg, #9795f0 0%, #fbc8d4 100%)";

export function GradientTeenNotebook({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #9795f0 0%, #fbc8d4 100%)", ...style }}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/** "Morpheus Den" gradient. */
export const GradientMorpheusDen_CSS = "linear-gradient(0deg, #30cfd0 0%, #330867 100%)";

export function GradientMorpheusDen({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #30cfd0 0%, #330867 100%)", ...style }}
      {...props}
    />
  );
}

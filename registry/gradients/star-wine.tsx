import * as React from "react";
import { cn } from "@/lib/utils";

/** "Star Wine" gradient. */
export const GradientStarWine_CSS = "linear-gradient(0deg, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)";

export function GradientStarWine({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)", ...style }}
      {...props}
    />
  );
}

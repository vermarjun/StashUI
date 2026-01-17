import * as React from "react";
import { cn } from "@/lib/utils";

/** "Norse Beauty" gradient. */
export const GradientNorseBeauty_CSS = "linear-gradient(0deg, #ec77ab 0%, #7873f5 100%)";

export function GradientNorseBeauty({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #ec77ab 0%, #7873f5 100%)", ...style }}
      {...props}
    />
  );
}

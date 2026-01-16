import * as React from "react";
import { cn } from "@/lib/utils";

/** "Cloudy Apple" gradient. */
export const GradientCloudyApple_CSS = "linear-gradient(0deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)";

export function GradientCloudyApple({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%)", ...style }}
      {...props}
    />
  );
}
